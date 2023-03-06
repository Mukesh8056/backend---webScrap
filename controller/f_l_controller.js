const axios = require('axios');
const f_l_Schema = require('../schema/f_l_schema');
const cheerio = require('cheerio');

const flipkartUrl = "https://www.flipkart.com/laptops/pr?sid=6bo,b5g&otracker=categorytree&fm=neo%2Fmerchandising&iid=M_180a7d68-c861-462b-a476-635372186c97_1_372UD5BXDFYS_MC.34WHNYFH5V2Y&otracker=hp_rich_navigation_8_1.navigationCard.RICH_NAVIGATION_Electronics~Laptop%2Band%2BDesktop_34WHNYFH5V2Y&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_8_L1_view-all&cid=34WHNYFH5V2Y";
const productDataLaptop = [];

const fetchProductDataLaptop = async (req, res) => {
  try {
    const response = await axios.get(flipkartUrl);
    const $ = cheerio.load(response.data);
    const laptops = $("._3Mn1Gg > ._1AtVbE");
   console.log(laptops)

    laptops.each((index, item) => {
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
      const productLaptop = {
        image,
        title,
        price,
        reviews,
        ratings,
        originalPrice,
        offerPercentage,
        specifications
      };
      productDataLaptop.push(productLaptop);
    });
    try {
      const savedProductsLaptop = await f_l_Schema.create(productDataLaptop);
      res.status(200).json(savedProductsLaptop);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to save data to database' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch data from Flipkart' });
  }
};

module.exports = fetchProductDataLaptop;
