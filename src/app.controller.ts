import { Controller, Get, Render } from '@nestjs/common';
import { ProductsService } from './products/products.service';
import { CategoriesService } from './categories/categories.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
  @Render('index')
  getIndex() {
    return {
      layout: '/layouts/main',
      title: 'Nahid - fruits',
      keywords: 'fruits, nahid, fruits shop, фрукты, Азербайджан',
      description: 'Nahid - fruits shop in Azerbaijan',
    };
  }

  @Get('about')
  @Render('about')
  getAbout() {
    return {
      layout: 'layouts/main',
      title: 'Nahid - fruits',
      keywords: 'fruits, nahid, fruits shop, фрукты, Азербайджан',
      description: 'Nahid - fruits shop in Azerbaijan',
    };
  }

  @Get('contact')
  @Render('contact')
  getContact() {
    return {
      layout: 'layouts/main',
      title: 'Nahid - fruits',
      keywords: 'fruits, nahid, fruits shop, фрукты, Азербайджан',
      description: 'Nahid - fruits shop in Azerbaijan',
    };
  }

  @Get('delivery')
  @Render('delivery')
  getDelivery() {
    return {
      layout: 'layouts/main',
      title: 'Nahid - fruits',
      keywords: 'fruits, nahid, fruits shop, фрукты, Азербайджан',
      description: 'Nahid - fruits shop in Azerbaijan',
    };
  }

  @Get('login')
  @Render('login')
  Login() {
    return {
      layout: 'layouts/main',
      title: 'Nahid - fruits',
      keywords: 'fruits, nahid, fruits shop, фрукты, Азербайджан',
      description: 'Nahid - fruits shop in Azerbaijan',
    };
  }

  @Get('fruit-list')
  @Render('fruit-list')
  async getFruitList() {
    const products = await this.productsService.findAll();
    const categories = await this.categoriesService.findAll();

    return {
      layout: 'layouts/main',
      title: 'Nahid - fruits',
      keywords: 'fruits, nahid, fruits shop, фрукты, Азербайджан',
      description: 'Nahid - fruits shop in Azerbaijan',
      products,
      categories,
    };
  }
}
