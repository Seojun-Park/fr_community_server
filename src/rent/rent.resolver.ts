import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRentInput } from './dto/create-rent.dto';
import { EditRentInput } from './dto/edit-rent.dto';
import { RentReturn, RentsReturn } from './dto/rent-return.dto';
import { Rent } from './entity/rent.entity';
import { RentService } from './rent.service';

@Resolver((of) => Rent)
export class RentResolver {
  constructor(private rentService: RentService) {}

  @Query((returns) => RentReturn)
  async getRent(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<RentReturn> {
    const res = await this.rentService.getRent(id);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Query((returns) => RentsReturn)
  async getRents(): Promise<RentsReturn> {
    const res = await this.rentService.getRents();
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => RentReturn)
  async createRent(
    @Args('args', { type: () => CreateRentInput }) args: CreateRentInput,
  ) {
    const res = await this.rentService.createRent(args);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => RentReturn)
  async editRent(
    @Args('args', { type: () => EditRentInput }) args: EditRentInput,
  ) {
    const res = await this.rentService.editRent(args);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => RentReturn)
  async deleteRent(@Args('id', { type: () => Int }) id: number) {
    const res = await this.rentService.deleteRent(id);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }
}
