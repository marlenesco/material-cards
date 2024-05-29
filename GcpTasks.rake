# Rake Tasks for deploying to Google Cloud
class GcpTasks
  include Rake::DSL

  def initialize
    logger = Logger.new($stdout)
    logger.level = Logger::DEBUG
    Google::Apis.logger = logger

    namespace :gcp do
      task :default do
        bucket.upload_file(config['home_page'], config['home_page'])
        folders.map do |folder|
          folder.each_entry do |file|
            path = folder.join(file)
          end
        end
      end
    end
  end

  private

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
end
