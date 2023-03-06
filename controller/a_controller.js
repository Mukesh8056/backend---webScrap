
const axios = require('axios')
const a_Schema = require('../schema/a_schema')
const cheerio = require('cheerio')
const tvUrl = "https://www.flipkart.com/televisions/~cs-vtrtr6t033/pr?sid=ckf%2Cczl&collection-tab-name=+40+inch+TVs&p%5B%5D=facets.availability%255B%255D%3DExclude%2BOut%2Bof%2BStock&ctx=eyJjYXJkQ29udGV4dCI6eyJhdHRyaWJ1dGVzIjp7InRpdGxlIjp7Im11bHRpVmFsdWVkQXR0cmlidXRlIjp7ImtleSI6InRpdGxlIiwiaW5mZXJlbmNlVHlwZSI6IlRJVExFIiwidmFsdWVzIjpbIjQwIEluY2ggVFZzIl0sInZhbHVlVHlwZSI6Ik1VTFRJX1ZBTFVFRCJ9fX19fQ%3D%3D&wid=11.productCard.PMU_V2_3";
const tvData = []
   
const tvProductData = async (req, res) => {
  try {
    const response = await axios.get(tvUrl);
    const $ = cheerio.load(response.data);
    const tv = $("._3Mn1Gg > ._1AtVbE");
    console.log(tv);
    tv.each((index, item) => {
      const image = $(item).find('._396cs4').attr("src");
      const title = $(item).find(".B_NuCI").text();
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
      tvData.push(product);
      console.log(tvData);
    });
    try {
      const savedProducts = await a_Schema.create(tvData);
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
  
  module.exports = tvProductData;


  


