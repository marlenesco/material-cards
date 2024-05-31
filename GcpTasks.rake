# Rake Tasks for deploying to Google Cloud
class GcpTasks
  include Rake::DSL

  class << self
    def loglevel
      Logger::INFO
    end

    def manifest_path
      Pathname('gcp_manifest.yaml')
    end
  end

  def initialize
    namespace :gcp do
      task :default do
        logger
        bucket.upload_file(config['home_page'], config['home_page'])
        manifest[:files] = []
        folders.map do |folder|
          manifest[:files].push(folder.find.map { |f| f if f.file? }.compact)
          # upload_folder_entries(folder)
        end
        manifest[:files] = manifest[:files].flatten
        write_manifest
      end
    end
  end

  private

  def logger
    unless @logger
      @logger ||= Logger.new($stdout)
      @logger.level = GcpTasks.loglevel
      Google::Apis.logger = @logger
    end
    @logger
  end

  def config
    @config ||= YAML.load_file('gcp-deploy.yaml')
  end

  def manifest
    @manifest ||= {}
  end

  def storage
    @storage ||= Google::Cloud::Storage.new(project_id: config['project_id'])
  end

  def bucket
    @bucket ||= storage.bucket(config['bucket'])
  end

  def folders
    @folders ||= config['folders'].map { |name| Pathname.new(name) }
  end

  def upload_folder_entries(folder)
    subfolders = []
    folder.each_entry do |file|
      path = folder.join(file)
      logger.info("uploading #{path} ...")
      if path.directory?
        subfolders.push(path) unless path.to_s.match(/[\.]{1,2}/)
      else
        bucket.upload_file(path.to_s, path.to_s) if path.file?
      end
    end
    subfolders.map { |folder| upload_folder_entries(folder) }
  end

  def write_manifest
    manifest[:uploaded] = Time.now
    File.open(GcpTasks.manifest_path, 'w') { |f| f.write(manifest.to_yaml) }
  end
end
