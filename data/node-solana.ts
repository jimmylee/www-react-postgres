import DB from "@root/db";

const runQuery = async ({ queryFn, errorFn, label }) => {
  let response;
  try {
    response = await queryFn();
  } catch (e) {
    response = await errorFn(e);
  }

  console.log("[ database-query ]", { query: label });
  return JSON.parse(JSON.stringify(response));
};

export const createAddress = async ({ address, data = {} }) => {
  return await runQuery({
    label: "CREATE_SOLANA_ADDRESS",
    queryFn: async () => {
      const query: any = await DB.insert({
        address,
        data,
      })
        .into("solana")
        .returning("*");

      const index = query ? query.pop() : null;
      return index;
    },
    errorFn: async (e) => {
      return {
        error: "CREATE_SOLANA_ADDRESS",
        source: e,
      };
    },
  });
};

export const getAddress = async ({ address }) => {
  return await runQuery({
    label: "GET_SOLANA_ADDRESS",
    queryFn: async () => {
      const query: any = await DB.select("*")
        .from("solana")
        .where({ address })
        .first();

      if (!query || query.error) {
        return null;
      }

      if (query.address) {
        return query;
      }

      return null;
    },
    errorFn: async (e) => {
      return {
        error: "GET_SOLANA_ADDRESS",
        source: e,
      };
    },
  });
};

// NOTE(jim)
// Warning this function has the power to wipe all data
export const updateAddress = async ({ address, data = {} }) => {
  return await runQuery({
    label: "UPDATE_SOLANA_ADDRESS",
    queryFn: async () => {
      const query: any = await DB.from("solana")
        .where("adddress", address)
        .update({
          data,
        });

      const index = query ? query.pop() : null;
      return index;
    },
    errorFn: async (e) => {
      return {
        error: "UPDATE_SOLANA_ADDRESS",
        source: e,
      };
    },
  });
};
