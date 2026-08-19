import {Img, staticFile} from 'remotion';
import {CASSETTE_ASSET} from '../../config/cassette';

export const CassetteBody = () => {
  return (
    <Img
      className="cassette-body__asset"
      src={staticFile(CASSETTE_ASSET)}
    />
  );
};
