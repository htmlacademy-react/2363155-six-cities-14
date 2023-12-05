import {ChangeEvent, useState} from 'react';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;
const Rating = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};

export default function ReviewForm () {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const isValid =
    comment.length >= MIN_COMMENT_LENGTH &&
    comment.length <= MAX_COMMENT_LENGTH &&
    rating;

  const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
  Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(Rating).reverse().map(([key, value] : string[]) => (
          <>
            <input
              onChange={handleRatingChange}
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={key}
              id={`${key}-stars`}
              type="radio"
            />
            <label
              htmlFor={`${key}-stars`}
              className="reviews__rating-label form__rating-label"
              title={value}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </>
        ))}
      </div>
      <textarea
        onChange={handleTextareaChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
    To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
    your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
        >
    Submit
        </button>
      </div>
    </form>
  );
}
