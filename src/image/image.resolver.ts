import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Image } from './entity/image.entity';
import { ImageService } from './image.service';

@Resolver((of) => Image)
export class ImageResolver {
  constructor(private imageService: ImageService) {}

  @Mutation((returns) => Boolean)
  async deleteImage(@Args('id', { type: () => Int }) id: number) {
    const res = await this.imageService.deleteImage(id);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
      data: typeof res === 'string' ? null : res,
    };
  }
}
