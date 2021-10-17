import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Image } from '../image/entity/image.entity';
import { Rent } from './entity/rent.entity';
import { RentService } from './rent.service';

class MockRentRepository {
  #data = [
    {
      id: 1,
      title: 'rent test',
      content: 'rent',
      price: '100',
      deposit: '300',
      type: 'onSale',
      square: '20',
      address: 'paris',
      options: 'studio',
      commission: true,
      guarantor: true,
    },
  ];
  findOne({ where: { id } }) {
    const data = this.#data.find((v) => v.id === id);
    if (data) return data;
    return 'no Rent found';
  }
}
class MockImageRepository {}

describe('RentService', () => {
  let service: RentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentService,
        {
          provide: getRepositoryToken(Rent),
          useClass: MockRentRepository,
        },
        { provide: getRepositoryToken(Image), useClass: MockImageRepository },
      ],
    }).compile();

    service = module.get<RentService>(RentService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return Rent by id', () => {
    expect(service.getRent(1)).resolves.toStrictEqual({
      id: 1,
      title: 'rent test',
      content: 'rent',
      price: '100',
      deposit: '300',
      type: 'onSale',
      square: '20',
      address: 'paris',
      options: 'studio',
      commission: true,
      guarantor: true,
    });
  });

  it('Should return not found rent', () => {
    expect(service.getRent(2)).resolves.toBe('no Rent found');
  });
});
