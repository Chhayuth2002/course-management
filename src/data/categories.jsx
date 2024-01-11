// ESM
import { faker } from "@faker-js/faker";

function createRandomCategory() {
  return {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    code: faker.internet.userName(),
  };
}

const categoryData = Array.from({ length: 5 }, createRandomCategory);

export default categoryData;
