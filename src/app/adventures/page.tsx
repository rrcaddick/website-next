import Image from 'next/image'
import Link from 'next/link'
import MouseGradientCard from '@/components/theme/MouseGradientCard'
import LogoSection from '@/components/ui/LogoSection'
import AdventuresMobileList from '@/components/features/adventures/AdventuresMobileList'
import { activities } from '@/components/features/adventures/data'
import PageHero from '@/components/ui/PageHero'

export default function Adventure() {
  return (
    <div>
      <PageHero
        mobileSrc="/images/home/mobile/adventures-banner.webp"
        desktopSrc="/images/adventures/adventures-banner.webp"
        title="Adventures"
      />

      {/* Description */}
      <div className="px-2">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            Explore the forest on horseback, take flight up to the sky, or grab a kayak and gently float on by.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Mobile Expandable List */}
        <AdventuresMobileList />
        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <Link
              key={activity.id}
              href={`/adventures/${activity.name
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')}`}
              className="group"
            >
              <MouseGradientCard className="bg-[#F3F4F6] text-[#202635] rounded-lg shadow-lg overflow-hidden flex flex-col h-full transition-all duration-500 ease-in-out transform hover:scale-105">
                <div className="relative w-full h-[250px]">
                  <Image
                    src={activity.image}
                    alt={activity.name}
                    fill
                    className="object-cover w-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold mb-3 text-[#202635] group-hover:text-[#00FF7F] transition-colors duration-500 ease-in-out">{activity.name}</h2>
                  <p className="text-gray-600 mb-6 min-h-[4.5rem] group-hover:text-white transition-colors duration-500 ease-in-out">{activity.description}</p>
                  <div className="mt-auto">
                    <h3 className="font-semibold mb-3 text-[#202635] group-hover:text-[#00FF7F] transition-colors duration-500 ease-in-out">Features:</h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600 group-hover:text-white transition-colors duration-500 ease-in-out">
                      {activity.features.map((feature, index) => (
                        <li key={`${activity.id}-feature-${index}`}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </MouseGradientCard>
            </Link>
          ))}
        </div>
      </div>

      {/* Safety Information */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-4 text-center dark:text-white">Adventure Safely</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none col-span-1 md:col-span-2">
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm mb-4 text-center">
              <li className="text-center">Always check the weather</li>
              <li className="text-center">Wear appropriate clothing and footwear</li>
              <li className="text-center">Stay hydrated and carry water</li>
              <li className="text-center">Inform staff of any medical need to knows</li>
              <li className="text-center">Wear a hat on sunny expeditions</li>
              <li className="text-center">Bring a backpack</li>
              <li className="text-center">Carry snacks</li>
              <li className="text-center">Watch out for the big bad wolf</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Logo Section */}
      <div className="mt-12 mb-8">
        <LogoSection />
      </div>
    </div>
  )
}
