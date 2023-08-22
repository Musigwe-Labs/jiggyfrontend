export const Wrapper = (Component) => {
  return (
    <>
      <main className='min-h-screen'>
        <Component />
      </main>
    </>
  );
};
