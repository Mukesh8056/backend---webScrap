
const axios = require('axios');
const f_Schema = require('../schema/f_schema');
const cheerio = require('cheerio');

const flipkartUrl = "https://www.flipkart.com/search?q=mobiles&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off&page=2";
const productData = [];

const fetchProductData = async (req, res) => {
  try {
    const response = await axios.get(flipkartUrl);
    const $ = cheerio.load(response.data);
    const mobiles = $("._3Mn1Gg > ._1AtVbE");
    // console.log(mobiles);
    mobiles.each((index, item) => {
      const image = $(item).find('._396cs4').attr("src");
      const title = $(item).find("._4rR01T").text();
      const price = $(item).find("._30jeq3").text();
      const reviews = $(item).find("._3LWZlK").text();  
      const ratings = $(item).find("._2_R_DZ > span > span").text();
      const originalPrice = $(item).find("._27UcVY").text();
      const offerPercentage = $(item).find("._3Ay6Sb > span").text();
      const specifications = [];
      $(item).find("ul > li").each(function(){
        specifications.push($(this).text());
      });
      const product = {
        image,
        title,
        price,
        reviews,
        ratings,
        originalPrice,
        offerPercentage,
        specifications
      };
      productData.push(product);
      console.log(productData);
    });
    try {
      const savedProducts = await f_Schema.create(productData);
      res.status(200).json(savedProducts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to save data to database' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch data from Flipkart' });
  }
};

module.exports = fetchProductData;

