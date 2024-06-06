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

      desc 'Deploy Current Files to GCP Bucket'
      task :deploy do
        fill_manifest
        logger.info('uploading Home Page ...')
        bucket.upload_file(config['home_page'], config['home_page'])
        apply_to_files do |f|
          logger.info("uploading #{f} ..")
          bucket.upload_file(f.to_s, f.to_s)
        end
        write_manifest(:deployed)
      end

      desc 'Clean Currently Deployed Files from Bucket'
      task :clean do
        fill_manifest
        logger.info('removing Home Page ...')
        bucket.file(config['home_page']).delete
        apply_to_files do |f|
          logger.info("removing #{f} ..")
          bucket.file(f.to_s).delete
        end
        write_manifest(:cleaned)
      end

      task default: :deploy
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

  def fill_manifest
    manifest[:files] = []
    folders.map do |folder|
      manifest[:files].push(folder.find.map { |f| f if f.file? }.compact)
    end
    manifest[:files] = manifest[:files].flatten
  end

  def apply_to_files
    manifest[:files].map do |f|
      if block_given?
        yield(f)
      else
        logger.info("file #{f} in manifest")
      end
    end
  end

  def write_manifest(action)
    manifest[:bucket] = bucket.name
    manifest[:action] = action
    manifest[:executed] = Time.now
    File.open(GcpTasks.manifest_path, 'w') { |f| f.write(manifest.to_yaml) }
  end
end
