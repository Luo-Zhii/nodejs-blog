module.exports = {
  content: [
    "./**/*", // Quét mọi file trong toàn bộ dự án
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      // Thêm các thành phần tùy chỉnh
      addComponents({
        ".custom-scrollbar::-webkit-scrollbar": {
          width: "8px", // Chiều rộng thanh cuộn
        },
        ".custom-scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0, 0, 0, 0.15)", // Màu của thanh cuộn
          borderRadius: "4px", // Bo góc thanh cuộn
        },
        ".custom-scrollbar::-webkit-scrollbar-track": {
          backgroundColor: "rgba(0, 0, 0, 0)", // Màu của phần nền thanh cuộn
        },
      });
    },
  ],
};
