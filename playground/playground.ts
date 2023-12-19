import estorage from 'estorage';

const bp = new estorage.Blueprint({
  username: String,
  password: String,
  level: Number,
});
