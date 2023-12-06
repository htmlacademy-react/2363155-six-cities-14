import { Comment } from '../../types/comment';
import ReviewForm from '../../components/review-form/review-form';

type RewievsListProps = {
  comments: Comment[];
}
export default function ReviewsList({comments} : RewievsListProps) {
  const getRating = (rating: number) => Math.round((rating * 100) / 5);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
  Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {comments.map((comment) => (
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
              <time className="reviews__time" dateTime="2019-04-24">
                          April 2019
              </time>
            </div>
          </li>
        ))}
      </ul>
      <ReviewForm />
    </section>
  );
}
