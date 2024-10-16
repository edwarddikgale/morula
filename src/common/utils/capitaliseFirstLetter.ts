const capitaliseFirstLetter = (str: string | undefined | null): string  => {
    if (!str) return ''; // Check if the string is empty or null
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default capitaliseFirstLetter;