export const saveQuizResult = (score) => {
    const dbRequest = indexedDB.open("quizHistoryDB", 1);
  
    dbRequest.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("history")) {
        db.createObjectStore("history", { keyPath: "id", autoIncrement: true });
      }
    };
  
    dbRequest.onsuccess = (e) => {
      const db = e.target.result;
      const transaction = db.transaction("history", "readwrite");
      const store = transaction.objectStore("history");
      store.add({ score, timestamp: new Date().toLocaleString() });
    };
  
    dbRequest.onerror = (e) => {
      console.error("IndexedDB error:", e.target.error);
    };
  };
  
  export const getQuizHistory = () => {
    return new Promise((resolve, reject) => {
      const dbRequest = indexedDB.open("quizHistoryDB", 1);
  
      dbRequest.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction("history", "readonly");
        const store = transaction.objectStore("history");
        const allRecords = store.getAll();
  
        allRecords.onsuccess = () => {
          // Ensure it's an array, even if no records exist
          resolve(allRecords.result || []);
        };
  
        allRecords.onerror = (e) => {
          reject(e.target.error);
        };
      };
  
      dbRequest.onerror = (e) => {
        reject(e.target.error);
      };
    });
  };
  
  