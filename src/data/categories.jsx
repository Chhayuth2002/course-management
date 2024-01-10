// ESM
import { faker } from "@faker-js/faker";

function createRandomUser() {
  return {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    code: faker.internet.userName(),
  };
}

const categoryData = faker.helpers.multiple(createRandomUser, {
  count: 5,
});

export default categoryData;
