// Have to import these individually because we don't want to accidentally import lodash

import { assert, formatRewardsRemaining, isErc1155, isNonEmptyString, networkStringToName } from "@/lib"
import { getQuestActionNetworkDetails } from "@/lib/getQuestActionNetworkDetails"
import { GetQuestByIdResponse } from "@/services/questService"
import { ImageResponse } from "@vercel/og"
import { isFuture } from "date-fns"
import { type NextApiRequest, type NextApiResponse } from "next/types"
import { match } from "ts-pattern"
import { formatUnits } from "viem"

// vercel doesn't like it if we import lodash/truncate so this is a quick and dirty replacement
function truncate(value: string, length = 33) {
  if (value.length <= length) {
    return value
  }
  return value.slice(0, length - 3) + "..."
}

export const config = {
  runtime: "edge",
}

const allowedMethods = ["GET"]

const font = fetch(
  new URL("../../../../../public/Inter-Medium.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

const EthIcon = () => (
  <svg
    aria-hidden="true"
    width="100%"
    height="100%"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ background: "#25292E", borderRadius: "100%" }}
  >
    <path
      d="M21.9967 6.99621L21.7955 7.67987V27.5163L21.9967 27.7171L31.2044 22.2744L21.9967 6.99621Z"
      fill="#ffffff"
    />
    <path
      d="M21.9957 6.99621L12.7878 22.2744L21.9957 27.7171V18.0891V6.99621Z"
      fill="#ffffff"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21.9959 36.9996L21.9959 36.9997V36.9995L31.2091 24.0243L21.9959 29.4642L12.788 24.0243L21.9957 36.9993L21.9958 36.9997L21.9959 36.9996Z"
      fill="#ffffff"
    />
    <path
      d="M21.996 27.7181L31.2037 22.2753L21.996 18.09V27.7181Z"
      fill="#ffffff"
    />
    <path
      d="M12.7878 22.2753L21.9957 27.7181V18.09L12.7878 22.2753Z"
      fill="#ffffff"
    />
  </svg>
)

const BaseIcon = () => (
  <img
    src="https://assets.rabbithole.gg/networks/base.png"
    width={24}
    height={24}
    alt="base-network"
  />
)

const OptimismIcon = () => (
  <svg
    aria-hidden="true"
    width="100%"
    height="100%"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ background: "rgb(255, 4, 32)", borderRadius: "100%" }}
  >
    <path
      d="M15.5877 27.8473C14.2777 27.8473 13.2045 27.539 12.3679 26.9226C11.5422 26.2952 11.1294 25.4035 11.1294 24.2477C11.1294 24.0055 11.157 23.7082 11.212 23.356C11.3552 22.5634 11.5588 21.6112 11.823 20.4994C12.5715 17.4722 14.5034 15.9586 17.6187 15.9586C18.4664 15.9586 19.2259 16.1017 19.8974 16.3879C20.5689 16.663 21.0973 17.0814 21.4826 17.6428C21.8678 18.1932 22.0605 18.8537 22.0605 19.6242C22.0605 19.8554 22.033 20.1471 21.9779 20.4994C21.8128 21.4791 21.6146 22.4313 21.3835 23.356C20.9982 24.8641 20.3322 25.9924 19.3855 26.741C18.4388 27.4785 17.1729 27.8473 15.5877 27.8473ZM15.8189 25.4695C16.4354 25.4695 16.9582 25.2879 17.3876 24.9247C17.8279 24.5614 18.1416 24.0055 18.3287 23.257C18.5819 22.2222 18.7746 21.3195 18.9067 20.5489C18.9507 20.3178 18.9727 20.0811 18.9727 19.8389C18.9727 18.8372 18.4498 18.3363 17.4041 18.3363C16.7876 18.3363 16.2592 18.5179 15.8189 18.8812C15.3896 19.2445 15.0813 19.8004 14.8943 20.5489C14.6961 21.2865 14.4979 22.1892 14.2998 23.257C14.2557 23.477 14.2337 23.7082 14.2337 23.9504C14.2337 24.9632 14.7622 25.4695 15.8189 25.4695Z"
      fill="white"
    />
    <path
      d="M22.8188 27.6815C22.6977 27.6815 22.6041 27.6429 22.5381 27.5659C22.483 27.4778 22.4665 27.3788 22.4885 27.2687L24.7672 16.5358C24.7892 16.4147 24.8498 16.3156 24.9489 16.2385C25.0479 16.1615 25.1525 16.1229 25.2626 16.1229H29.6548C30.8767 16.1229 31.8564 16.3761 32.5939 16.8825C33.3426 17.3889 33.7168 18.1209 33.7168 19.0786C33.7168 19.3538 33.6838 19.64 33.6177 19.9372C33.3426 21.2032 32.7867 22.1389 31.95 22.7443C31.1244 23.3498 29.9905 23.6525 28.5485 23.6525H26.3194L25.5598 27.2687C25.5377 27.3898 25.4772 27.4888 25.3782 27.5659C25.2791 27.6429 25.1745 27.6815 25.0645 27.6815H22.8188ZM28.6641 21.3738C29.1264 21.3738 29.5282 21.2472 29.8695 20.994C30.2217 20.7408 30.4529 20.3776 30.563 19.9042C30.596 19.717 30.6125 19.552 30.6125 19.4089C30.6125 19.0896 30.519 18.8474 30.3318 18.6823C30.1446 18.5062 29.8255 18.4182 29.3741 18.4182H27.3926L26.7652 21.3738H28.6641Z"
      fill="white"
    />
  </svg>
)

const PolygonIcon = () => (
  <svg
    aria-hidden="true"
    width="100%"
    height="100%"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ background: "rgb(111, 65, 216)", borderRadius: "100%" }}
  >
    <path
      d="M29.0015 17.4529C28.4941 17.1572 27.8355 17.1572 27.2773 17.4529L23.3186 19.7271L20.6305 21.2094L16.6719 23.4822C16.1645 23.7792 15.5059 23.7792 14.9476 23.4822L11.8016 21.703C11.2943 21.4074 10.9395 20.8642 10.9395 20.2702V16.7612C10.9395 16.1686 11.2434 15.6255 11.8016 15.3285L14.8954 13.5988C15.4041 13.3018 16.0641 13.3018 16.6224 13.5988L19.7161 15.3285C20.2249 15.6255 20.5796 16.1686 20.5796 16.7612V19.0355L23.2678 17.5024V15.2295C23.2707 14.9343 23.1917 14.6441 23.0395 14.3911C22.8873 14.1381 22.6679 13.9324 22.4056 13.7968L16.6719 10.5353C16.1645 10.2382 15.5059 10.2382 14.9476 10.5353L9.11214 13.7968C8.84992 13.9324 8.63049 14.1381 8.47828 14.3911C8.32607 14.6441 8.24705 14.9343 8.25002 15.2295V21.802C8.25002 22.396 8.55389 22.9391 9.11214 23.2361L14.9476 26.4976C15.455 26.7932 16.115 26.7932 16.6719 26.4976L20.6305 24.2729L23.3186 22.7411L27.2773 20.5177C27.7846 20.2207 28.4433 20.2207 29.0015 20.5177L32.0966 22.2475C32.6054 22.5431 32.9588 23.0863 32.9588 23.6803V27.1893C32.9588 27.7819 32.6563 28.325 32.0966 28.622L29.0029 30.4013C28.4941 30.6983 27.8341 30.6983 27.2773 30.4013L24.1821 28.6715C23.6734 28.3745 23.3186 27.8314 23.3186 27.2387V24.9645L20.6305 26.4976V28.7705C20.6305 29.3631 20.9344 29.9076 21.4926 30.2032L27.3281 33.4647C27.8355 33.7617 28.4941 33.7617 29.0524 33.4647L34.8879 30.2032C35.3953 29.9076 35.75 29.3645 35.75 28.7705V22.198C35.753 21.9028 35.674 21.6126 35.5218 21.3596C35.3695 21.1066 35.1501 20.9009 34.8879 20.7653L29.0029 17.4529H29.0015Z"
      fill="white"
    />
  </svg>
)

const ArbitrumIcon = () => (
  <svg
    aria-hidden="true"
    width="100%"
    height="100%"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ background: "rgb(44, 54, 79)", borderRadius: "100%" }}
  >
    <path
      d="M25.7948 20.5826L28.2683 16.3854L34.9355 26.7696L34.9386 28.7625L34.9168 15.0491C34.9011 14.7137 34.7231 14.407 34.4391 14.2261L22.4357 7.32182C22.1551 7.1838 21.7989 7.18546 21.5187 7.32618C21.4807 7.34524 21.4453 7.36576 21.4113 7.38835L21.3694 7.41467L9.71816 14.1664L9.67298 14.1871C9.61474 14.2137 9.55609 14.2479 9.50076 14.2872C9.27983 14.4456 9.1331 14.68 9.08564 14.9425C9.07859 14.9823 9.0732 15.023 9.07092 15.064L9.08916 26.239L15.2994 16.6138C16.0811 15.3376 17.7847 14.9262 19.3662 14.9488L21.2221 14.9977L10.2862 32.5356L11.5753 33.2778L22.6422 15.0155L27.5338 14.9977L16.4956 33.7209L21.0955 36.3668L21.6451 36.6827C21.8776 36.7772 22.1516 36.7819 22.386 36.6972L34.5581 29.6433L32.2309 30.9918L25.7948 20.5826ZM26.7384 34.175L22.0925 26.8829L24.9287 22.0702L31.0303 31.6876L26.7384 34.175Z"
      fill="#2D374B"
    />
    <path
      d="M22.0924 26.8832L26.7385 34.1751L31.0302 31.6879L24.9286 22.0705L22.0924 26.8832Z"
      fill="#28A0F0"
    />
    <path
      d="M34.9387 28.7627L34.9356 26.7698L28.2684 16.3856L25.7949 20.5828L32.2312 30.992L34.5584 29.6435C34.7866 29.4582 34.9248 29.1861 34.9393 28.8926L34.9387 28.7627Z"
      fill="#28A0F0"
    />
    <path
      d="M7 30.642L10.2863 32.5356L21.2222 14.9976L19.3663 14.9487C17.785 14.9263 16.0814 15.3375 15.2995 16.6137L9.08927 26.239L7 29.449V30.642V30.642Z"
      fill="white"
    />
    <path
      d="M27.534 14.9977L22.6423 15.0155L11.5754 33.2778L15.4437 35.5049L16.4955 33.7209L27.534 14.9977Z"
      fill="white"
    />
    <path
      d="M37 14.9723C36.9592 13.9493 36.4052 13.013 35.5377 12.4677L23.377 5.47434C22.5187 5.04223 21.4466 5.04161 20.5868 5.47414C20.4852 5.52533 8.76078 12.3251 8.76078 12.3251C8.5985 12.4029 8.44224 12.4955 8.2953 12.6008C7.52081 13.156 7.0487 14.0186 7 14.9661V29.4492L9.08927 26.2392L9.07103 15.0639C9.07352 15.0231 9.0787 14.9827 9.08575 14.9431C9.133 14.6801 9.27994 14.4457 9.50086 14.2872C9.5562 14.2478 21.4806 7.34517 21.5186 7.32611C21.799 7.18538 22.155 7.18373 22.4356 7.32175L34.439 14.226C34.723 14.4069 34.901 14.7137 34.9167 15.049V28.8921C34.9022 29.1856 34.7862 29.4577 34.558 29.643L32.2308 30.9916L31.03 31.6875L26.7383 34.1747L22.3859 36.6969C22.1515 36.7817 21.8773 36.7769 21.645 36.6824L16.4955 33.7206L15.4435 35.5046L20.0713 38.169C20.2243 38.256 20.3607 38.3331 20.4726 38.3961C20.6458 38.4933 20.764 38.5582 20.8056 38.5785C21.1345 38.7383 21.6077 38.8311 22.0342 38.8311C22.4251 38.8311 22.8064 38.7594 23.1672 38.6181L35.8092 31.2971C36.5347 30.7348 36.9617 29.8869 37 28.9686V14.9723Z"
      fill="#96BEDC"
    />
  </svg>
)

const ZoraIcon = () => (
  <img
    src="https://assets.rabbithole.gg/ourzora.png"
    width={24}
    height={24}
    alt="zora-network"
  />
)

const ChainIcon = ({ network }: { network: string }) => {
  return match(network)
    .with("polygon-mainnet", "polygon-mumbai", () => <PolygonIcon />)
    .with("eth-goerli", "eth-mainnet", "eth-sepolia", () => <EthIcon />)
    .with("opt-goerli", "opt-mainnet", () => <OptimismIcon />)
    .with("arb-goerli", "arb-mainnet", () => <ArbitrumIcon />)
    .with("zora-mainnet", () => <ZoraIcon />)
    .with("base-mainnet", () => <BaseIcon />)
    .otherwise(() => <div tw="w-[24px] h-[24px] bg-black rounded-full" />)
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!allowedMethods.includes(req.method || "")) {
    return res.status(405).send({ message: "Method not allowed" })
  }

  const { searchParams } = new URL(req.url!)
  const questId = searchParams.get("questId")

  try {
    assert(isNonEmptyString(questId), "Missing questId")

    const response = await fetch(
      `https://public-api.rabbithole.gg/quest?questId=${questId}`
    )

    const { quest, reward } = (await response.json()) as GetQuestByIdResponse
    const fontData = await font

    assert(
      isNonEmptyString(quest.id),
      "No quest object. Maybe the ID is wrong?"
    )

    const questStart = quest.questStart
    const isNft = isErc1155(reward.type)

    // force override since BE returns upcoming as 'active'
    let status = quest.status
    if (isNonEmptyString(questStart) && isFuture(new Date(questStart))) {
      status = "upcoming"
    }

    const network = getQuestActionNetworkDetails(quest)

    return new ImageResponse(
      (
        <div tw="h-full w-full flex items-start justify-start bg-[#1E1E1E]">
          <div tw="flex items-start justify-start h-full">
            <div tw="flex w-full flex-col justify-between h-full p-16 pb-10">
              <div tw="flex items-center justify-between w-full">
                <div
                  tw="flex items-center justify-start text-white"
                  style={{ gap: 16 }}
                >
                  <div tw="flex m-0 p-0 rounded-full w-[24px] h-[24px]">
                    <ChainIcon network={network?.name || ''} />
                  </div>
                  <p tw="flex m-0 p-0 text-2xl">
                    {networkStringToName(network?.name)}
                  </p>
                </div>
                {match(status)
                  .with("upcoming", () => (
                    <span tw="text-orange-500 text-2xl">COMING SOON</span>
                  ))
                  .with("active", () => (
                    <div
                      tw="flex items-center justify-start text-white"
                      style={{ gap: 8 }}
                    >
                      <span
                        tw="w-[20px] h-[20px] rounded-full bg-[#43F6AB]"
                        style={{ boxShadow: "0px 1px 15px #43F6AB" }}
                      />
                      <span tw="text-[#43F6AB] text-2xl">ACTIVE</span>
                    </div>
                  ))
                  .otherwise(() => (
                    <span tw="text-[#BE8888] text-2xl">EXPIRED</span>
                  ))}
              </div>
              <div
                tw="flex flex-col items-start justify-center flex-1"
                style={{ gap: 44 }}
              >
                <div tw="flex flex-col w-full">
                  <h1 tw="text-[80px] font-bold m-0 p-0 leading-1 text-white tracking-[-1.6px] w-full">
                    {truncate(quest.name || '', 40)}
                  </h1>
                </div>
                <div
                  tw="flex items-center justify-start text-white"
                  style={{ gap: 16 }}
                >
                  <div tw="flex flex-col items-start justify-start bg-[#303030] shadow-lg p-6 border border-[#494949] rounded-xl max-w-[50%] min-w-[380px]">
                    <p tw="m-0 p-0 font-light">Reward</p>
                    <div tw="flex items-center justify-start">
                      {isNft ? (
                        <p tw="m-0 p-0 text-3xl">1 NFT</p>
                      ) : (
                        <p tw="m-0 p-0 text-3xl">
                          {formatUnits(
                            BigInt(reward.amount || 0),
                            reward.decimals || 18
                          )}{" "}
                          {reward.tokenSymbol}
                        </p>
                      )}
                    </div>
                  </div>
                  <div tw="flex flex-col items-start justify-start bg-[#303030] shadow-lg p-6 border border-[#494949] rounded-xl max-w-[50%] min-w-[380px]">
                    <p tw="m-0 p-0 font-light">Rewards Left</p>
                    <div tw="flex items-center justify-start">
                      <p tw="m-0 p-0 text-3xl">
                        <span>
                          {formatRewardsRemaining(
                            reward.allocations || 0,
                            reward.allocationsClaimed || 0
                          )}
                        </span>
                        <span tw="mx-2">/</span>
                        <span tw="opacity-50">{reward.allocations}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div tw="flex items-center justify-start">
                <svg
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: "flex" }}
                >
                  <circle
                    cx="20.19"
                    cy="20.7718"
                    r="19.939"
                    fill="url(#paint0_linear_1045_289)"
                  />
                  <circle
                    cx="20.19"
                    cy="20.7718"
                    r="19.939"
                    fill="url(#paint1_linear_1045_289)"
                    fillOpacity="0.29"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <mask
                    id="mask0_1045_289"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="41"
                    height="41"
                  >
                    <circle
                      cx="20.1481"
                      cy="20.8136"
                      r="20.0644"
                      fill="#D9D9D9"
                    />
                  </mask>
                  <g mask="url(#mask0_1045_289)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23.3408 17.0263C18.7648 16.0554 15.121 12.5617 13.9337 8.06958C13.7816 7.49411 14.4221 7.09831 14.9057 7.4454L32.8954 20.3583C33.1169 20.5172 33.22 20.7928 33.1713 21.061C33.0553 21.7009 32.9947 22.3601 32.9947 23.0335C32.9947 23.8725 33.0888 24.6895 33.267 25.4746C33.3288 25.7468 33.2338 26.0364 32.9977 26.1853C32.0886 26.7585 31.009 27.0905 29.8511 27.0905C28.8893 27.0905 27.9815 26.8614 27.1807 26.4554C26.9529 26.3399 26.6934 26.2949 26.4442 26.3509C25.9887 26.4534 25.665 26.858 25.665 27.3249V35.0565C25.665 35.4319 25.3607 35.7362 24.9853 35.7362H24.0241C23.6584 35.7362 23.3626 35.4454 23.3072 35.084C22.8935 32.3846 20.5704 30.3176 17.7666 30.3176C17.5811 30.3176 17.3978 30.3267 17.217 30.3444C17.0199 30.3636 16.8762 30.5339 16.8762 30.7319V30.7319C16.8762 30.9475 17.0466 31.1232 17.2606 31.1501C19.6011 31.4446 21.4115 33.4422 21.4115 35.8626C21.4115 36.1706 21.3821 36.4718 21.3261 36.7635C21.2567 37.125 21.514 37.4931 21.8821 37.4931H22.399C22.4062 37.4931 22.412 37.4988 22.412 37.506V37.506C22.412 37.5131 22.4177 37.5189 22.4249 37.5189H26.3046C26.4904 37.5189 26.6695 37.5937 26.7942 37.7315C26.869 37.8141 26.9414 37.8981 27.009 37.9845C27.3252 38.3884 27.3386 39.0282 27.3386 40.0287C27.3386 40.3194 27.2243 40.5994 27.0127 40.8617C26.902 40.9989 26.7283 41.064 26.552 41.064H14.6198C14.4333 41.064 14.2542 40.9879 14.1291 40.8496C13.9689 40.6726 13.8138 40.4909 13.6638 40.3048C13.3448 39.9088 12.6782 39.9369 12.2491 40.2098C11.9037 40.4294 11.4937 40.5566 11.0541 40.5566C9.82236 40.5566 8.82386 39.5581 8.82386 38.3264C8.82386 37.0947 9.82236 36.0962 11.0541 36.0962V36.0962C11.2359 36.0962 11.3872 35.9244 11.3397 35.749C11.056 34.7024 10.9047 33.6011 10.9047 32.4642C10.9047 25.5783 16.4582 19.9962 23.3089 19.9962C23.7818 19.9962 24.1982 19.6793 24.3674 19.2377L24.3811 19.2021C24.6994 18.3875 24.1964 17.2079 23.3408 17.0263ZM8.94488 17.7873C8.4837 17.7873 8.27557 18.3345 8.64845 18.6059C10.2956 19.8047 12.3236 20.5119 14.5167 20.5119C16.7099 20.5119 18.7378 19.8047 20.385 18.6059C20.7579 18.3345 20.5497 17.7873 20.0885 17.7873H8.94488ZM29.0263 23.0227C29.6222 23.0227 30.1053 22.5396 30.1053 21.9437C30.1053 21.3478 29.6222 20.8647 29.0263 20.8647C28.4304 20.8647 27.9473 21.3478 27.9473 21.9437C27.9473 22.5396 28.4304 23.0227 29.0263 23.0227Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_1045_289"
                      x1="4.0838"
                      y1="5.19405"
                      x2="31.3927"
                      y2="38.4119"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#AF7EFF" />
                      <stop offset="1" stopColor="#8044FF" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1045_289"
                      x1="20.19"
                      y1="0.832794"
                      x2="20.19"
                      y2="40.7108"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopOpacity="0" />
                      <stop offset="1" stopColor="#0F0E31" />
                    </linearGradient>
                  </defs>
                </svg>
                <p tw="text-white pl-4 text-3xl mb-0 pb-4 flex leading-1">
                  RabbitHole
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontData,
            style: "normal",
          },
        ],
      }
    )
  } catch (err) {
    console.error(
      `Rendered fallback OG image for questId ${questId} because:`,
      err
    )

    return new ImageResponse(
      (
        <div tw="h-full w-full flex items-center justify-center">
          <img
            src={process.env.NEXT_PUBLIC_THEME_BRAND_OG_IMAGE_URI}
            tw="h-full w-full flex"
            alt=""
            style={{ objectFit: "cover" }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
}
