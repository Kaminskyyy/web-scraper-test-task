import axios from 'axios';
import * as cheerio from 'cheerio';
import { Person } from './interfaces/person.interface';

export class ScrapeService {
  static async getPageContent(): Promise<string> {
    const page = await axios.get('https://interaction24.ixda.org/');

    return page.data;
  }

  static async parsePage(): Promise<Person[]> {
    const htmlContent = await this.getPageContent();
    const $ = cheerio.load(htmlContent);

    const peopleList: any[] = [];

    // Id of list items
    $('#w-node-_9dfda272-5d3d-d6b7-7323-35abbf10bf89-37fff3e9').each((index, element) => {
      // Extract image link
      const imageWrapper = $(element).find('.speakers-list_item-image-wrapper');
      const imageLink = imageWrapper.find('img').attr('src');

      // Extract name and role
      const containsNameAndRole = imageWrapper.next();
      const name = containsNameAndRole.find('.speakers-list_item-heading').text();
      const role = containsNameAndRole.find('.speakers-list_item-heading').parent().next().text();

      // Extract sociial network links
      const socialNetworkLinks: string[] = [];
      const containsSocailNetworkLinks = containsNameAndRole.next();

      containsSocailNetworkLinks.find('a').each((index, element) => {
        const link = $(element);
        if (!link.hasClass('w-condition-invisible')) {
          socialNetworkLinks.push(link.attr('href')!);
        }
      });

      peopleList.push({
        image: 'https://interaction24.ixda.org' + imageLink?.slice(2),
        name,
        role,
        socialNetworkLinks
      });
    });

    return peopleList;
  }
}
