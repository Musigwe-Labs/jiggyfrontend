export const Wrapper = (Component) => {
  return (
    <>
      <main className='min-h-screen flex flex-col'>
        <Component />
      </main>
    </>
  );
};
