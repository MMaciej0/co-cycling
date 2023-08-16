import HomeForm from './components/homePage/HomeForm';
import getCurrentUser from './actions/getCurrentUser';
import { SafeUser } from './types';

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="pt-32 md:pt40 px-6 md:px-12 pb-10 max-w-contentContainer m-auto lg:h-screen lg:overflow-hidden overflow-y-auto lg:flex lg:flex-col lg:justify-center">
      <div className="grid grid-rows-1 lg:grid-cols-2">
        <div className="mb-12">
          <h1 className="font-black tracking-wide text-4xl xs:text-6xl md:text-8xl  text-center lg:text-start">
            Lets cycle <p className="text-highlight pt-4">together!</p>
          </h1>
          <h2 className="mt-10 md:mt-16 lg:mt-40 text-center lg:text-start text-light/80 font-semibold text-xl lg:text-3xl lg:leading-relaxed lg:max-w-[450px]">
            Finding companions to ride or train with, has never been easier.
            Just enter your starting point and search for available rides or
            create your own one!
          </h2>
        </div>
        <div className="lg:ml-16">
          <HomeForm currentUser={user as SafeUser} />
        </div>
      </div>
    </div>
  );
}
