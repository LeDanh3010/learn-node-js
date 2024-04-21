import Handlebars from "handlebars";
export default {
  helper: {
    sum: (a, b) => a + b,
    SortTable: (field, _sort) => {
      const sortType = field === _sort.column ? _sort.type : "default";

      const icons = {
        default: "fa-solid fa-code",
        asc: "fa-solid fa-arrow-up-short-wide",
        desc: "fa-solid fa-arrow-down-short-wide",
      };

      const types = {
        default: "desc",
        asc: "desc",
        desc: "asc",
      };

      const icon = icons[sortType];
      const type = types[sortType];
      const href = Handlebars.escapeExpression(
        `?_sort&column=${field}&type=${type}`
      );
      const result = `<a class="sort-btn" href=${href}>
      <i class="${icon}"></i>
  </a>`;
      return new Handlebars.SafeString(result);
    },
  },
};
