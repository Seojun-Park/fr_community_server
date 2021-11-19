import { Args, Query, Resolver, Int, Mutation } from '@nestjs/graphql';
import { CreateMarketInput } from './dto/create-market.input';
import { EditMarketInput } from './dto/edit-market.input';
import { MarketReturn, MarketsReturn } from './dto/market-return.dto';
import { Market } from './entity/market.entity';
import { MarketService } from './market.service';

@Resolver((of) => Market)
export class MarketResolver {
  constructor(private readonly marketService: MarketService) {}

  @Query((returns) => MarketReturn)
  async getMarket(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<MarketReturn> {
    const res = await this.marketService.getMarket(id);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Query((returns) => MarketsReturn)
  async getMarketsByCategory(
    @Args('category', { type: () => String }) category: string,
    @Args('load', { type: () => Int }) load: number,
  ): Promise<MarketsReturn> {
    const res = await this.marketService.getMarketsByCategory(category, load);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Query((returns) => MarketsReturn)
  async getMarkets(): Promise<MarketsReturn> {
    const res = await this.marketService.getMarkets();
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => MarketReturn)
  async createMarket(
    @Args('args', { type: () => CreateMarketInput }) args: CreateMarketInput,
  ): Promise<MarketReturn> {
    const res = await this.marketService.createMarket(args);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => MarketReturn)
  async editMarket(
    @Args('args', { type: () => EditMarketInput }) args: EditMarketInput,
  ): Promise<MarketReturn> {
    const res = await this.marketService.editMarket(args);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }

  @Mutation((returns) => Boolean || String)
  async deleteMarket(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean | string> {
    return await this.marketService.deleteMarket(id);
  }
}
