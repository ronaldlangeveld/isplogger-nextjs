// import functions from the package
import { SitemapStream, streamToPromise } from "sitemap";
import api from '../../utils/Api';

// A custom function I use to fetch data from a backend. I will keep the import to make it more clear why "graphlqlFetch" is used in the code
// import graphlqlFetch from "lib/apollo"

export default async (req, res) => {

//   Fetch data from a source which will be used to render the sitemap.
//   const { posts } = await graphlqlFetch(`
//     query getSitemapData {
//       projects: allWorks {
//         slug {
//           current
//         }
//         publishedAt
//       }
//     }
//   `);



const providers = await api.get('providers/').then((res) => {
    // console.log(res.data)
    return res.data;
}, (err) => {
    // console.log(err)
    return
})



  // Create the a stream to write to with a hostname which will be used for all links
  // Your are able to add more settings to the stream. I recommend to look a the npm package for more information.
  const smStream = new SitemapStream({
    hostname: "https://isplogger.com",
  });

  // Add frontpage
  smStream.write({
    url: "/",
  });

  // Add a static url to ex: about page
  smStream.write({
    url: "/about",
  });

  smStream.write({
    url: "/providers",
  });


providers.map((item, index) => {
    smStream.write({
        url: `/providers/${item.slug}`,
        changefreq: 'daily'
    })
});


  // tell sitemap that there is nothing more to add to the sitemap
  smStream.end();

  // generate a sitemap and add the XML feed to a url which will be used later on.
  const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());
  // here is the generation of the sitemap happening

  // tell the output that we will output XML
  res.setHeader("Content-Type", "text/xml");
  // write the generate sitemap to the output
  res.write(sitemap);
  // end and send the data to the user or service.
  res.end();
};