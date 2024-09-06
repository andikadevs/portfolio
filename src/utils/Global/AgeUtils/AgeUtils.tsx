export const calculateAgeDetails = (birthDate: Date): { years: number; days: number; time: string } => {
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
  
    // Adjust years if the birth date hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      years--;
    }
  
    // Calculate total days since birth date
    const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  
    // Calculate the exact days since last birthday
    const lastBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (today < lastBirthday) {
      lastBirthday.setFullYear(lastBirthday.getFullYear() - 1);
    }
    const days = totalDays - Math.floor((lastBirthday.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  
    // Time calculation
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const time = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
    return { years, days, time };
};