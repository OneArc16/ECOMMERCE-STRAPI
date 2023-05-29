module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: "AKIAX5BXX2ROSI2XGS4Q",
        secretAccessKey: "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",
        region: "us-east-2",
        params: {
          Bucket: "ecommerce-strapi-games-daniel",
        },
      },
    },
  },
});
