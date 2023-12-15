import elstorage from 'elstorage';

const urlModel = new elstorage.Schema({
  username: String,
  password: String,
});

const ShortUrl = elstorage.model('ShortUrl', urlModel);
export default ShortUrl;
