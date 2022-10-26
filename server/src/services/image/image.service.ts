import { ImgurResponse } from '@common/types/imgur-response/imgur-response';
import { HttpError } from '@dtos/exceptions/error.dto';
import { Image } from '@prisma/client';
import { heroImagesService } from '@services/hero-images/hero-images.service';
import { imgurService } from '@services/imgur/imgur.service';
import { File } from 'formidable';
import httpStatus from 'http-status-codes';

interface ImageFile extends File {
  path?: string;
}

const imageService = {
  uploadImages: async (
    heroId: string,
    image: ImageFile | ImageFile[],
  ): Promise<Omit<Image, 'id'>[]> => {
    try {
      const images = Array.isArray(image)
        ? await imageService.uploadImagesToImgur(image)
        : await imageService.uploadImageToImgur(image);

      return images.map((image) => ({
        url: image.link,
        delete_hash: image.deleteHash || null,
        hero_id: heroId,
      }));
    } catch (error) {
      throw new HttpError(error as Error, httpStatus.INTERNAL_SERVER_ERROR);
    }
  },
  uploadImagesToImgur: async (
    images: Array<ImageFile>,
  ): Promise<ImgurResponse[]> => {
    try {
      const uploadPromises: Array<Promise<ImgurResponse>> = [];

      images.forEach(
        ({ path }: ImageFile) =>
          path && uploadPromises.push(imgurService.uploadImage(path)),
      );

      const results = await Promise.all(uploadPromises);
      return results.map((result) => ({
        link: result.link,
        deleteHash: result.deleteHash,
      }));
    } catch (error) {
      throw new HttpError(error as Error, httpStatus.INTERNAL_SERVER_ERROR);
    }
  },
  uploadImageToImgur: async ({ path }: ImageFile): Promise<ImgurResponse[]> => {
    const result = path && (await imgurService.uploadImage(path));
    return result
      ? [
          {
            link: result.link,
            deleteHash: result.deleteHash,
          },
        ]
      : [];
  },
  deleteImages: async (IdsToDelete: string[]): Promise<void> => {
    const images = await heroImagesService.getImagesById(IdsToDelete);
    const deletedHashes = images.flatMap((image) => image.delete_hash || []);
    await imgurService.deleteImages(deletedHashes);
  },
};

export { imageService };
