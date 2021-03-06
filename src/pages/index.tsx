import Head from 'next/head';
import { useContext, useState } from 'react';
import { Add } from '@material-ui/icons';
import { useMediaQuery } from 'react-responsive';

import { Navbar } from 'components/Navbar';
import CardList from 'components/CardList';
import { NewTaskModal } from 'components/NewTaskModal';
import { TaskContext } from 'context/TaskContext';
import { UserInfo } from 'components/UserInfo';
import { TaskDetailed } from 'components/TaskDetailed';

import * as S from 'styles/pages/home';
import theme from 'styles/theme/light';

export default function Home() {
  const { isTaskDetailShown } = useContext(TaskContext);

  const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);

  const bigScreen = useMediaQuery({
    query: `(min-width: ${theme.screenSize.tablet})`,
  });

  function openModal() {
    setIsModalTaskOpen(true);
  }

  function closeModal() {
    setIsModalTaskOpen(false);
  }

  return (
    <>
      <Head>
        <title>Home | What to-do</title>
      </Head>

      <NewTaskModal isOpen={isModalTaskOpen} onRequestClose={closeModal} />

      <S.Container>
        <Navbar />

        <S.MainContent>
          <UserInfo />
          <S.TasksSection>
            <section className="task-list-section">
              <CardList />
              {bigScreen && (
                <S.AddButton style={{ marginTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={openModal}
                    style={{ width: '4rem', height: '4rem' }}
                  >
                    <Add />
                  </button>
                </S.AddButton>
              )}
            </section>
            {isTaskDetailShown && (
              <section className="task-details">
                <TaskDetailed />
              </section>
            )}
          </S.TasksSection>
        </S.MainContent>

        {!bigScreen && (
          <S.AddButton
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
            }}
          >
            <button
              type="button"
              onClick={openModal}
              style={{ width: '5rem', height: '5rem' }}
            >
              <Add />
            </button>
          </S.AddButton>
        )}
      </S.Container>
    </>
  );
}
