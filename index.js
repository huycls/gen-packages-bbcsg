const { GoPrimitiveDot } = require("./src/icons/go/GoPrimitiveDot");
const { FaCheck } = require("./src/icons/fa/FaCheck");
const { Fragment } = require("react");
const { Tab } = require("@headlessui/react");

module.exports = function Packages({ cost, dataIncorporation }) {
  // let [isOpen, setIsOpen] = useState(false);
  // const [valueSelected, setValueSelected] = useState("2");
  return (
    <section>
      <div className="container mt-10 lg:mt-[115px] px-0">
        {/* PC*/}
        <div className="lg:block hidden">
          <div className="grid grid-rows-1 gap-8 lg:grid-cols-3">
            {cost.packages.map((item, index) => {
              const data = dataIncorporation?.Packages?.find(
                (packages, indexPackage) => packages.id === item.id
              );
              const sum = data?.Services?.reduce(
                (sum, item) => sum + item?.Fee?.value,
                0
              );
              const save = Math.abs(
                data?.Services?.reduce((sum, item) => {
                  // service_type_id === 49 tượng trưng cho Discount của API, nên có thể luôn là số âm
                  if (item.service_type_id === 49) {
                    return sum + item?.Fee?.value;
                  } else {
                    return sum;
                  }
                }, 0)
              );
              return (
                <div
                  key={index}
                  className={`group rounded-3xl relative bg-white px-4 pt-6 py-10 flex justify-between flex-col border-4 border-white hover:border-bbc-brand-500 `}
                  style={{ boxShadow: "rgb(181 181 181 / 0.25) 0 16px 40px" }}
                >
                  <div>
                    {item.isStar && (
                      <div className="absolute inset-x-0 -top-11 bg-[#FFAB00] h-20 -z-20 rounded-t-3xl">
                        <p className="font-semibold text-[24px] leading-[36px] text-white text-center">
                          Most Popular
                        </p>
                      </div>
                    )}
                    <h2
                      className={`${
                        item.isStar
                          ? "text-[#FFAB00]"
                          : "text-bbc-brand-500" && item.active
                          ? " text-bbc-brand-700"
                          : " text-bbc-brand-500"
                      } text-[32px] leading-[42px] font-semibold text-center mb-8`}
                    >
                      <div>{data?.PackageType?.name.toUpperCase()}</div>
                    </h2>
                    <p
                      className={`${
                        item.isStar
                          ? "text-[#FFAB00]"
                          : "text-bbc-brand-500" && item.active
                          ? " text-bbc-brand-700"
                          : " text-bbc-brand-500"
                      }  text-[52px] leading-[64px] font-semibold text-center mb-2 flex items-center justify-center`}
                    >
                      US$
                      {sum}
                      <span className="text-[22px] font-medium leading-[33px] text-[#001533]">
                        /năm
                      </span>
                    </p>
                    <div className="text-center pb-8 mb-8 border-b">
                      <span className="text-xl font-medium text-[#898989]">
                        Tiết kiệm US$
                        {save}
                      </span>
                    </div>
                    <ul className="px-3 mb-8">
                      {item?.liTitle?.map((itemLi, indexLi) => {
                        return (
                          <div className="flex mb-2" key={indexLi}>
                            <div>
                              <GoPrimitiveDot
                                size={16}
                                className={`text-bbc-brand-500 mt-1`}
                              />
                            </div>
                            <span
                              className="ml-2 text-bbc-gray font-semibold text-base"
                              dangerouslySetInnerHTML={{
                                __html: itemLi,
                              }}
                            />
                          </div>
                        );
                      })}
                      {item.cardBody.map((itemCard, index) => (
                        <li key={index} className="flex mb-2 text-[#666666]">
                          <span className="mt-1 mr-2 text-[#3994ff] text-xs ml-1">
                            <FaCheck />
                          </span>
                          <span
                            className="text-bbc-gray font-normal"
                            dangerouslySetInnerHTML={{ __html: itemCard }}
                          />
                        </li>
                      ))}
                      {item.note && (
                        <p
                          className="text-sm leading-6 px-2 text-bbc-gray font-normal pt-8"
                          dangerouslySetInnerHTML={{ __html: item.note }}
                        />
                      )}
                    </ul>
                  </div>
                  <div>
                    {item.noteSp && (
                      <p
                        className="text-sm leading-6 px-5 text-bbc-gray font-normal"
                        dangerouslySetInnerHTML={{ __html: item.noteSp }}
                      />
                    )}
                    <div className="text-center w-full pt-8 mt-8 border-t px-1">
                      <button
                        className={`py-2 px-6 cursor-pointer w-full rounded-3xl bg-white border border-bbc-brand-500 font-normal text-bbc-brand-500 group-hover:bg-bbc-brand-500 group-hover:text-white group-hover:font-semibold`}
                        onClick={() => {
                          setIsOpen(true);
                          setValueSelected(item.idPackage);
                        }}
                      >
                        Liên Hệ Ngay
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Mobile */}
        <div className="lg:hidden max-w-sm mx-auto px-4">
          <Tab.Group>
            <Tab.List className="lg:hidden overflow-hidden flex border rounded-full">
              {cost.packages.map((item, index) => {
                const data = dataIncorporation?.Packages?.find(
                  (nameMobile, indexNameMobile) => nameMobile.id === item.id
                );
                return (
                  <Tab key={index} as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={
                          selected
                            ? "text-bbc-brand-500 py-4 text-sm grow w-1/3 last:w-3/6 rounded-full border-bbc-brand-500 border font-medium"
                            : "bg-white text-[#B7B7B7] text-sm py-4 grow w-1/3 font-normal"
                        }
                      >
                        {data?.PackageType?.name}
                      </button>
                    )}
                  </Tab>
                );
              })}
            </Tab.List>
            <Tab.Panels>
              {cost.packages.map((item, index) => {
                const data = dataIncorporation?.Packages?.find(
                  (packages, indexPackage) => packages.id === item.id
                );
                const sum = data?.Services?.reduce(
                  (sum, item) => sum + item?.Fee?.value,
                  0
                );
                const save = Math.abs(
                  data?.Services?.reduce((sum, item) => {
                    if (item.service_type_id === 49) {
                      return sum + item?.Fee?.value;
                    } else {
                      return sum;
                    }
                  }, 0)
                );
                return (
                  <Tab.Panel key={index}>
                    <div
                      className={`${
                        item.isStar ? "mt-[68px]" : "mt-6"
                      } pt-6 pb-10 rounded-3xl relative bg-white lg:col-4 col-12 flex flex-col justify-between `}
                      style={{
                        boxShadow: "rgb(181 181 181 / 0.25) 0 16px 40px",
                      }}
                    >
                      <div>
                        {item.isStar && (
                          <div className="absolute inset-x-0 -top-11 bg-[#FFAB00] h-20 -z-20 rounded-t-3xl">
                            <p className="font-semibold text-[24px] leading-[36px] text-white text-center">
                              Most Popular
                            </p>
                          </div>
                        )}
                        <h2
                          className={`${
                            item.isStar
                              ? "text-[#FFAB00]"
                              : "text-bbc-brand-500" && item.active
                              ? " text-bbc-brand-700"
                              : " text-bbc-brand-500"
                          } text-[32px] leading-[42px] font-semibold text-center mb-8`}
                        >
                          {data?.PackageType?.name.toUpperCase()}
                        </h2>
                        <p
                          className={`${
                            item.isStar
                              ? "text-[#FFAB00]"
                              : "text-bbc-brand-500" && item.active
                              ? " text-bbc-brand-700"
                              : " text-bbc-brand-500"
                          }  text-[50px] leading-[54px] font-semibold text-center mb-4 flex items-center justify-center`}
                        >
                          US$
                          {sum}
                          <span className="text-[22px] font-medium leading-[33px] text-[#001533]">
                            /năm
                          </span>
                        </p>
                        <div className="text-center pb-8 mb-8 border-b mx-4">
                          <span className="text-lg font-semibold text-[#898989]">
                            Tiết kiệm US$
                            {save}
                          </span>
                        </div>
                        <ul className="px-4 mb-2">
                          {item?.liTitle?.map((itemLi, indexLi) => {
                            return (
                              <div className="flex mb-2" key={indexLi}>
                                <div>
                                  <GoPrimitiveDot
                                    size={16}
                                    className={`text-bbc-brand-500 mt-1`}
                                  />
                                </div>
                                <span
                                  className="ml-2 text-bbc-gray font-semibold text-base"
                                  dangerouslySetInnerHTML={{
                                    __html: itemLi,
                                  }}
                                />
                              </div>
                            );
                          })}
                          {item.cardBody.map((itemCard, index) => (
                            <li
                              key={index}
                              className="flex mb-2 text-[#666666]"
                            >
                              <span className="mt-1 mr-2 text-bbc-brand-400 text-xs ml-2">
                                <FaCheck />
                              </span>
                              <span
                                className="text-bbc-gray font-normal"
                                dangerouslySetInnerHTML={{ __html: itemCard }}
                              />
                            </li>
                          ))}
                          {item.note && (
                            <p
                              className="text-sm leading-6 px-2 text-bbc-gray font-normal pt-8"
                              dangerouslySetInnerHTML={{ __html: item.note }}
                            />
                          )}
                        </ul>
                      </div>
                      <div>
                        {item.noteSp && (
                          <p
                            className="text-sm leading-6 px-6 text-bbc-gray font-normal pt-8"
                            dangerouslySetInnerHTML={{ __html: item.noteSp }}
                          />
                        )}

                        <div className="text-center w-full pt-8 mt-8 border-t px-4">
                          <button
                            className={`py-2 px-6 cursor-pointer w-full rounded-3xl bg-white border border-bbc-brand-500 font-normal text-bbc-brand-500`}
                            onClick={() => {
                              setIsOpen(true);
                              setValueSelected(item.idPackage);
                            }}
                          >
                            Liên Hệ Ngay
                          </button>
                        </div>
                      </div>
                    </div>
                  </Tab.Panel>
                );
              })}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </section>
  );
};
