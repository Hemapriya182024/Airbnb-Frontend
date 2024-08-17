export default function Image({ src = '', ...rest }) {
  src = typeof src === 'string' && src.includes('https://')
    ? src
    : 'https://airbnb-backend-tm1o.onrender.com/api/uploads/' + src;

  return (
    <img {...rest} src={src} alt="" />
  );
}
