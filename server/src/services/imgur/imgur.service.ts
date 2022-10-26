import { createReadStream } from 'node:fs';

import { ENV } from '@common/enums/app';
import { ImgurResponse } from '@common/types/imgur-response/imgur-response';
import { HttpError } from '@dtos/exceptions/error.dto';
import httpStatus from 'http-status-codes';
import { ImgurApiResponse, ImgurClient } from 'imgur';

const client = new ImgurClient({ clientId: ENV.IMGUR.CLIENT_ID });

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
