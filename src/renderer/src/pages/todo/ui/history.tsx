import { FC, memo } from 'react';
import { useLoaderData } from 'react-router-dom';
import css from './todo-list.module.scss';
import { ListState, StoryAction, StoryPointType } from '../type';
import { parseDate } from '@renderer/shared/lib/date';

export const History: FC = () => {
  const data = useLoaderData() as ListState;

  return (
    <>
      <h3>History</h3>
      <div className={css.list}>
        {(data?.history || []).map((story) => (
          <StoryPoint key={story.id} {...story} />
        ))}
      </div>
    </>
  );
};

const StoryPoint = memo<StoryPointType>(({ data, date, action }) => {
  return (
    <div className={css.item}>
      <span className={css.name}>{data?.name}</span>
      <span className={css.status}>
        {action === StoryAction.Add ? 'Was Added' : 'Was Removed'}
      </span>
      <span className={css.controls}>at {parseDate(date)}.</span>
    </div>
  );
});

StoryPoint.displayName = 'StoryPoint';
