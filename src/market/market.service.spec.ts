import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Image } from '../image/entity/image.entity';
import { Market } from './entity/market.entity';
import { MarketService } from './market.service';

class MockMarketRepository {
  #data = [
    {
      id: 1,
      title: 'market test',
      content: 'test',
      price: '50',
      location: 'paris',
      status: 'onSale',
    },
  ];
  findOne({ where: { id } }) {
    const data = this.#data.find((v) => v.id === id);
    if (data) return data;
    return 'no Market found';
  }
}

class MockImageRepository {}

describe('MarketService', () => {
  let service: MarketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketService,
        {
          provide: getRepositoryToken(Market),
          useClass: MockMarketRepository,
        },
        {
          provide: getRepositoryToken(Image),
          useClass: MockImageRepository,
        },
      ],
    }).compile();

    service = module.get<MarketService>(MarketService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return Market by id', () => {
    expect(service.getMarket(1)).resolves.toStrictEqual({
      id: 1,
      title: 'market test',
      content: 'test',
      price: '50',
      location: 'paris',
      status: 'onSale',
    });
  });

  it('Should return not found market', () => {
    expect(service.getMarket(2)).resolves.toBe('no Market found');
  });
});
