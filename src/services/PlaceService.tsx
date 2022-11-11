import React from "react";
import { Mutation, Query } from "../apollo/GraphQL";
import {
  CustomMutationOutput,
  CustomQueryOutput,
  useCustomMutation,
  useCustomQuery,
} from "../apollo/hooks";
import { Ipayload, IUser } from "../store/User";

export const useQueryPlaceTypes = (): CustomQueryOutput<IPlaceType[]> => {
  const [call, status] = useCustomQuery(Query.placeTypes);

  const data = React.useMemo(() => {
    return status.data || [];
  }, [status.data]);

  return [
    call,
    {
      ...status,
      data,
    },
  ];
};

export const useQueryPlaces = (): CustomQueryOutput<IPlaceType> => {
  const [call, status] = useCustomQuery(Query.places);
  return [call, status];
};

export interface IPlaceType {
  id: number;
  name: string;
  description: string;
}

export const PlacesData = [
  {
    id: 1,
    name: "ArteCinema",
    categoryId: 1,
    description:
      "El ArteCinema es un cine arte en la Plaza Constitución de Buenos Aires, que pertenece a la red del organismo estatal INCAA. Abierto en 2009 como una sala privada, el emprendimiento quebró y en 2010 pasó a manos del Instituto para transmitir cine nacional.",
  },
  {
    id: 2,
    name: "Cosmos-UBA",
    categoryId: 1,
    description:
      "El Cine Cosmos-UBA es una sala cinematográfica que se encuentra en Avenida Corrientes 2046 de la ciudad de Buenos Aires. Nacido con el nombre de Cine Cataluña, se hizo famoso en los años '60 —ya como Cine Cosmos 70— por la proyección de cine alternativo de origen soviético, transformándose en un reducto de vanguardia cultural. Fue comprado por la Universidad de Buenos Aires y reabierto en noviembre de 2010.",
  },
  {
    id: 3,
    name: "Cine Lorca",
    categoryId: 1,
    description:
      "El Cine Lorca es un clásico cine arte de la Avenida Corrientes en Buenos Aires. Inaugurado en 1968 con el nombre de Cine Lion, el edificio ocupa el lugar donde antes estuvo el Cine Éclair, en Corrientes 1428.",
  },
  {
    id: 4,
    name: "Basílica de la Inmaculada Concepción",
    categoryId: 2,
    description:
      "La Basílica Inmaculada Concepción es un templo situado en Concepción del Uruguay, Provincia de Entre Ríos, República Argentina. En su interior descansan los restos del presidente Justo José de Urquiza.",
  },
  {
    id: 5,
    name: "Biblioteca Popular del Paraná",
    categoryId: 2,
    description:
      "La Biblioteca Popular del Paraná fue fundada oficialmente el 1 de marzo de 1873 en la ciudad de Paraná, Entre Ríos. El presidente Domingo Faustino Sarmiento había creado, en 1870, la Comisión Protectora de Bibliotecas Populares (hoy Comisión Nacional de Bibliotecas Populares (CONABIP)), lo que la convierte en una de las bibliotecas populares más antiguas de la Argentina.",
  },
  {
    id: 6,
    name: "Casa de Gobierno de Entre Ríos",
    categoryId: 2,
    description:
      "La Casa de Gobierno de Entre Ríos, conocida popularmente como Casa Gris, está ubicada en el centro de la ciudad de Paraná, Entre Ríos, Argentina, y es la sede de dos de los tres poderes provinciales: el Poder Ejecutivo y el Poder Legislativo (Cámara de Diputados y Cámara de Senadores).",
  },
  {
    id: 7,
    name: "Bioparque Temaikèn",
    categoryId: 3,
    description:
      "Temaikèn es un bioparque ubicado en Escobar, provincia de Buenos Aires, Argentina, a 50 kilómetros de la Ciudad Autónoma de Buenos Aires. Es propiedad de la Fundación Temaikèn, entidad sin fines de lucro fundada por Gregorio Pérez Companc.",
  },
  {
    id: 8,
    name: "Acuario del Río Paraná",
    categoryId: 3,
    description:
      "El Acuario del Río Paraná, formalmente Centro Científico Tecnológico y Educativo Acuario del Río Paraná, es un acuario público que fue construido para ser un establecimiento científico y educativo. Está situado en la ciudad de Rosario, en la provincia argentina de Santa Fe.",
  },
  {
    id: 9,
    name: "Mundo Marino",
    categoryId: 3,
    description:
      "Mundo Marino es el oceanario más grande de la Argentina. Está ubicado en la ciudad de San Clemente del Tuyú, Partido de La Costa, Provincia de Buenos Aires, Argentina. Tiene 40 ha de parque para recorrer con distintas atracciones y presentaciones educativas.",
  },
  {
    id: 10,
    name: "Mar del Plata Aquarium",
    categoryId: 3,
    description:
      "Mar del Plata Aquarium es uno de los parques marinos más importantes de Argentina, situado junto al Faro Punta Mogotes, Mar del Plata, . Posee una gran variedad de delfines, lobos marinos, pingüinos, peces y aves exóticas y autóctonas. Los visitantes pueden participar y aprender en las exhibiciones, charlas y recorridos de los distintos hábitats.",
  },
];
