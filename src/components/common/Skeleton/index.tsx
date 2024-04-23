const Skeleton = (props: { cnt: number }) => {
  const { cnt } = props;
  const skeletonList = Array.from({ length: cnt }, (_, index) => (
    <div
      key={index}
      className="animate-pulse bg-slate-200 p-5 rounded-2xl mb-4"
    >
      <div className="h-4 bg-zinc-300 rounded w-28 mb-2"></div>
      <div className="h-4 bg-zinc-300 rounded w-56"></div>
    </div>
  ));
  return <>{skeletonList}</>;
};

export default Skeleton;
