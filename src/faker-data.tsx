import { faker } from '@faker-js/faker';

export const getStakeData = async () => {
  // 需要延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));
  //   随机返回十个数据
  // 生成1000个数据项
  console.time('generateData');
  const generateData = () => {
    const data: any[] = [];
    for (let i = 0; i < 110; i++) {
      data.push({
        id:
          faker.number.int({ min: 1000, max: 9999 }) +
          '-' +
          faker.number.int({ min: 1000, max: 9999 }) +
          '-' +
          faker.number.int({ min: 1000, max: 9999 }),
        address: faker.finance.ethereumAddress(),
        amount: parseFloat(faker.finance.amount(1000, 10000, 2)),
        ensName: faker.helpers.arrayElement([
          faker.internet.domainWord() + '.eth',
          faker.company.name(),
          faker.internet.userName(),
          null
        ])
      });
    }
    return data;
  };
  const data = generateData();
  console.timeEnd('generateData');
  return data;
};

export const getActivePools = async () => {
  // 需要延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));
  //   随机返回十个数据
  return [
    {
      id: '1',
      collator: '0x3d6d656c1bf92f7028Ce4C352563E1C363C58ED5',
      balance: 999.999,
      commission: '45.00%',
      session: '34'
    },
    {
      id: '2',
      collator: '0x3d6d656c1bf92f7028Ce4C352563E1C363C58ED5',
      balance: 999.999,
      commission: '45.00%',
      session: '34'
    },
    {
      id: '3',
      collator: '0x3d6d656c1bf92f7028Ce4C352563E1C363C58ED5',
      balance: 999.999,
      commission: '45.00%',
      session: '34'
    },
    {
      id: '4',
      collator: '0x3d6d656c1bf92f7028Ce4C352563E1C363C58ED5',
      balance: 999.999,
      commission: '45.00%',
      session: '34'
    }
  ];
};

export const getActiveDepositRecords = async () => {
  // 需要延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));
  //   随机返回十个数据
  return {
    count: 4,
    results: [
      {
        id: '1',
        duration: ['2020.01.04', '2020.03.04'],
        amount: 1141.12,
        reward: 1141.12,
        action: 'Withdraw Earlier'
      },
      {
        id: '2',
        duration: ['2020.01.04', '2020.03.04'],
        amount: 1141.12,
        reward: 1141.12,
        action: 'Withdraw'
      },
      {
        id: '3',
        duration: ['2020.01.04', '2020.03.04'],
        amount: 1141.12,
        reward: 1141.12,
        action: 'Withdraw Earlier'
      },
      {
        id: '4',
        duration: ['2020.01.04', '2020.03.04'],
        amount: 1141.12,
        reward: 1141.12,
        action: 'Withdraw '
      }
    ]
  };
};
