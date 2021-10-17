import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { ImageReturn } from './dto/image-return.dto';
import { Image } from './entity/image.entity';
import { ImageService } from './image.service';

@Resolver((of) => Image)
export class ImageResolver {
  constructor(private imageService: ImageService) {}

  @Mutation((returns) => ImageReturn)
  async deleteImage(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ImageReturn> {
    const res = await this.imageService.deleteImage(id);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
    };
  }

  @Mutation((returns) => ImageReturn)
  async addImage(
    @Args('id', { type: () => Int }) id: number,
    @Args('type', { type: () => String }) type: string,
    @Args('url', { type: () => String }) url: string,
  ): Promise<ImageReturn> {
    const res = await this.imageService.addImage(id, type, url);
    return {
      success: typeof res === 'string' ? false : true,
      error: typeof res === 'string' ? res : null,
    };
  }
}
