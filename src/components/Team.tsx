import React from 'react';

const team = [
  {
    name: 'Ananya Gyana',
    role: 'AI/ML Lead',
    //image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Arnav Pathak',
    role: 'Backend Architecture',
    //image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Ayush Gourav',
    role: 'Frontend Development',
    //
  },
  {
    name: 'Ujjawal Chaudhary',
    role: 'Product Strategy',
    //image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const Team = () => {
  return (
    <section className="py-24 bg-white" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 sm:text-4xl">
            Meet Team Loopify
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            The experts behind Nurturebot X, combining expertise in AI, sales, and technology
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="space-y-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                    <img
                      className="relative rounded-3xl mx-auto h-48 w-48 object-cover shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300"
                      src={member.image}
                      alt={member.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3 className="text-gray-900">{member.name}</h3>
                      <p className="text-emerald-600 font-semibold">{member.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;