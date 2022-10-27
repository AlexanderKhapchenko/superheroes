import { createReadStream } from 'node:fs';

import { ImgurResponse } from '@common/types/imgur-response/imgur-response';
import { HttpError } from '@dtos/exceptions/error.dto';
import client from '@services/imgur/imgur-client';
import httpStatus from 'http-status-codes';
import { ImgurApiResponse } from 'imgur';

const imgurService = {
  uploadImage: async (path: string): Promise<ImgurResponse> => {
    try {
      const response = await client.upload({
        image: createReadStream(path) as never,
        type: 'stream',
      });

      const { link, deletehash } = response.data;
      return { link, deleteHash: deletehash };
    } catch (error) {
      throw new HttpError(error as Error, httpStatus.INTERNAL_SERVER_ERROR);
    }
  },
  deleteImages: async (deleteHashes: Array<string>): Promise<void> => {
    try {
      const deletePromises: Array<Promise<ImgurApiResponse<boolean>>> = [];
      deleteHashes.forEach(
        (deleteHash: string) =>
          deleteHash && deletePromises.push(client.deleteImage(deleteHash)),
      );
      await Promise.all(deletePromises);
    } catch (error) {
      throw new HttpError(error as Error, httpStatus.INTERNAL_SERVER_ERROR);
    }
  },
};

export { imgurService };
