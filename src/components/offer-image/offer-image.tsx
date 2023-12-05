type OfferImgProps = {
  image: string;
}

export default function OfferImage ({image} : OfferImgProps) {
  return (
    <div className="offer__image-wrapper">
      <img
        className="offer__image"
        src={image}
        alt="Photo studio"
      />
    </div>
  );
}
