export interface Person {
  image: string;
  name: string;
  role: string;
  socialNetworkLinks: string[];
}

export interface PersonFlattened extends Omit<Person, 'socialNetworkLinks'> {
  socialNetworkLinks: string;
}
