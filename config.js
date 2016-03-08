module.exports = {
  email : process.env.USERNAME,
  password : process.env.PASSWORD,
  schedule: JSON.parse(process.env.SCHEDULE)
};
