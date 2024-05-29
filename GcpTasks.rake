# Rake Tasks for deploying to Google Cloud
class GcpTasks
  include Rake::DSL

  class << self
    def loglevel
      Logger::INFO
    end
  end

  def initialize
    namespace :gcp do
      task :default do
        logger
        bucket.upload_file(config['home_page'], config['home_page'])
        folders.map do |folder|
          upload_folder_entries(folder)
        end
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
    folder.each_entry do |file|
      path = folder.join(file)
      logger.info("uploading #{path} ...")
      if path.directory?
        upload_folder_entries(path) unless path.to_s.match(/[\.]{1,2}/)
      else
        bucket.upload_file(path.to_s, path.to_s) if path.file?
      end
    end
  end
end
