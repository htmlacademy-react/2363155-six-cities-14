import {ChangeEvent, useState, FormEvent, useRef, Fragment} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { addComment} from '../../store/api-actions';
import { RequestStatus } from '../../const';
import { toast } from 'react-toastify';

type ReviewFormProps = {
  id: string | undefined;
}

const CommentTextLength = {
  Min: 50,
  Max: 300,
} as const;

const Rating = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};

export default function ReviewForm ({id} : ReviewFormProps) {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const isValid =
    comment.length >= CommentTextLength.Min &&
    comment.length <= CommentTextLength.Max &&
    rating;
  const commentLoadStatus = useAppSelector((state) => state.offers.isCommentLoading);
  const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };
  const formRef = useRef<HTMLFormElement>(null);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleFormSubmit = (evt : FormEvent) => {
    evt.preventDefault();
    const userComment = {
      offerId: id,
      comment,
      rating,
    };
    dispatch(addComment(userComment)).unwrap()
      .then(() => {
        setComment('');
        setRating(0);
      })
      .catch(() => {
        toast.error('Failed to send a review. Please try again');
      });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit} ref={formRef}>
      <label className="reviews__label form__label" htmlFor="review">
  Your review
      </label>
      <div className="reviews__rating-form form__rating" key={'reviews__rating'}>
        {Object.entries(Rating).reverse().map(([key, value] : string[]) => (
          <Fragment key={key}>
            <input
              key={`${key}Input`}
              onChange={handleRatingChange}
              className="form__rating-input visually-hidden"
              name="rating"
              value={key}
              checked = {key === rating.toString()}
              id={`${key}-stars`}
              type="radio"
              disabled={commentLoadStatus === RequestStatus.Pending }
            />
            <label
              key={`${key}Label`}
              htmlFor={`${key}-stars`}
              className="reviews__rating-label form__rating-label"
              title={value}
            >
              <svg className="form__star-image" width={37} height={33} key={`${key}-icon`}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        onChange={handleTextareaChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        disabled={commentLoadStatus === RequestStatus.Pending}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
    To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
    your stay with at least{' '}
          <b className="reviews__text-amount">{CommentTextLength.Min} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || commentLoadStatus === RequestStatus.Pending}
        >
    Submit
        </button>
      </div>
    </form>
  );
}
