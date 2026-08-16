
import { prisma } from "@/lib/prisma";

const page = async () => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <div >
      <div>
        {JSON.stringify(users, null, 2)}
      </div>
      <div>
        {JSON.stringify(posts, null, 2)}
      </div>
    </div>
  );
};

export default page;
