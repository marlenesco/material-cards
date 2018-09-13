require 'dotenv/load'
require 'net/ftp'
require 'yaml'
require 'pathname'
require 'forwardable'
require 'awesome_print'

class FTPClient
  extend Forwardable
  attr_reader :remote_path

  def_delegators :@ftp, :chdir, :delete, :putbinaryfile

  def initialize(remote_path)
    @remote_path = remote_path
  end

  def ftp
    @ftp ||= Net::FTP.new
  end

  def connect
    ftp.connect(ENV['FTP_SERVER'])
    ftp.login(ENV['FTP_USER'], ENV['FTP_PASSWORD'])
    ftp.passive = true
    ftp.debug_mode = ENV['FTP_DEBUG'] ? eval(ENV['FTP_DEBUG']) : false
    ftp.chdir(remote_path)
  end

  def delete_recursive(file_or_dir)
    if file_or_dir == list(file_or_dir).first
      puts "Removing file: #{file_or_dir}"
      ftp.delete(file_or_dir)
    else
      list(file_or_dir).each { |entry| delete_recursive(entry) }
      puts "Removing directory: #{file_or_dir}"
      ftp.rmdir(file_or_dir)
    end
  end

  def copy_recursive(file_or_dir, prefix_to_remove = nil)
    remote_file_or_dir = Pathname(prefix_to_remove ? file_or_dir.to_s.gsub(prefix_to_remove, "") : file_or_dir)
    if file_or_dir.directory?
      puts "Creating directory #{remote_file_or_dir}"
      ftp.mkdir(remote_file_or_dir.to_s)
      Pathname.glob(Pathname.new('.').join(file_or_dir, '*')).each do |entry|
        copy_recursive(entry, prefix_to_remove)
      end
    else
      puts "Creating file #{remote_file_or_dir}"
      ftp.putbinaryfile(file_or_dir, remote_file_or_dir.to_s)
    end
  end

  # file list
  def list(path = nil)
    ftp.nlst(path).select { |entry| entry !~ %r([.]{1,2}$) }
  end
end

class Deployer
  def initialize(spec)
    %w(remote_home home_page folders).each do |attr|
      instance_variable_set("@#{attr}".to_sym, spec[attr])
    end
    @ftp_client = FTPClient.new(remote_home)
    ftp_client.connect
  end

  def run
    remove_home_page
    clean_folders
    deploy_home_page
    deploy_folders
  ensure
    ftp_client.ftp.close
  end

  def clean
    remove_home_page
    clean_folders
  ensure
    ftp_client.ftp.close
  end

  private

  attr_reader :remote_home, :home_page, :folders, :ftp_client

  def reset
    ftp_client.chdir(remote_home)
  end

  def remove_home_page
    reset
    puts 'cleaning up old home page'
    ftp_client.delete(home_page) if ftp_client.list.include?(home_page)
  end

  def deploy_home_page
    reset
    puts 'deploying home page to remote server'
    ftp_client.putbinaryfile(home_page, home_page)
  end

  def clean_folders
    reset
    folders.each do |_, remote|
      ftp_client.chdir(remote)
      ftp_client.list.each do |entry|
        ftp_client.delete_recursive(entry)
      end
    end
  end

  def deploy_folders
    reset
    folders.each do |local, remote|
      ftp_client.chdir(remote)
      Pathname.glob(Pathname(local).join('*')).each do |entry|
        ftp_client.copy_recursive(entry, local + "/")
      end
    end
  end
end

desc 'check environment'
task :check_env do
  errors = []
  %w[SERVER USER PASSWORD].each do |param|
    key = "FTP_#{param}"
    val = ENV[key]
    errors.push("must define environment value for #{key}") unless val && val.length > 0
  end
  fail errors.join(', ') unless errors.length == 0
  puts 'environment is good to go!'
end

desc 'clean, compile and minify'
task :compile do
 `yarn build-once`
end

desc 'read deployment specifications'
task :spec do
  ap $spec = YAML.load_file('deploy.yml')
end

desc 'deploy the specified local files to the remote server'
task :deploy do
  Deployer.new($spec).run
end

desc 'remove all deployed files and folders from the remove server'
task clean: [:check_env, :spec] do
  Deployer.new($spec).clean
end

desc 'default: deploy local files to remote server after compiling'
task default: [:check_env, :spec, :compile, :deploy]

desc 'debugging'
task debug: [:check_env, :spec, :deploy]
