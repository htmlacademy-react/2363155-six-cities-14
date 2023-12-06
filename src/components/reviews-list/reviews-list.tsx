import { Comment } from '../../types/comment';
import ReviewForm from '../../components/review-form/review-form';
import { useAppSelector } from '../../hooks/redux-hooks';
import { AuthorizationStatus, MAX_COMMENT_COUNT } from '../../const';
import { dateSorting } from '../../util';
import * as dayjs from 'dayjs';

type RewievsListProps = {
  comments: Comment[];
  id: string | undefined;
}

export default function ReviewsList({comments, id} : RewievsListProps) {
  const getRating = (rating: number) => Math.round((rating * 100) / 5);
  const authStatus = useAppSelector((state) => state.user.authorizationStatus);
  const sortedComments = [...comments].sort(dateSorting).slice(0, MAX_COMMENT_COUNT);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
  Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedComments.map((comment) => (
          <li key={comment.id} className="reviews__item">
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img
                  className="reviews__avatar user__avatar"
                  src={comment.user.avatarUrl}
                  width={54}
                  height={54}
                  alt="Reviews avatar"
                />
              </div>
              <span className="reviews__user-name">{comment.user.name}</span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{ width: `${getRating(comment.rating)}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">{comment.comment}</p>
              <time className="reviews__time" dateTime={dayjs(comment.date).format('YYYY-MM-DD')}>
                {dayjs(comment.date).format('MMMM YYYY')}
              </time>
            </div>
          </li>
        ))}
      </ul>
      {authStatus === AuthorizationStatus.Auth && <ReviewForm id={id}/>}
    </section>
  );
}
