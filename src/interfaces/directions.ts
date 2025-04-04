export interface DirectionsResponse {
  routes: Route[];
  waypoints: Waypoint[];
  code: string;
  uuid: string;
}

export interface Route {
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
  legs: Leg[];
  geometry: Geometry;
}

export interface Geometry {
  coordinates: Array<number[]>;
  type: Type;
}

export enum Type {
  LineString = 'LineString',
}

export interface Leg {
  via_waypoints: any[];
  admins: Admin[];
  weight: number;
  duration: number;
  steps: Step[];
  distance: number;
  summary: string;
}

export interface Admin {
  iso_3166_1_alpha3: string;
  iso_3166_1: string;
}

export interface Step {
  intersections: Intersection[];
  maneuver: Maneuver;
  name: string;
  duration: number;
  distance: number;
  driving_side: DrivingSide;
  weight: number;
  mode: Mode;
  geometry: Geometry;
}

export enum DrivingSide {
  Left = 'left',
  Right = 'right',
  Straight = 'straight',
}

export interface Intersection {
  bearings: number[];
  entry: boolean[];
  mapbox_streets_v8?: MapboxStreetsV8;
  is_urban?: boolean;
  admin_index: number;
  out?: number;
  geometry_index: number;
  location: number[];
  in?: number;
  duration?: number;
  weight?: number;
  turn_weight?: number;
  turn_duration?: number;
  traffic_signal?: boolean;
  stop_sign?: boolean;
  lanes?: Lane[];
  classes?: string[];
}

export interface Lane {
  indications: DrivingSide[];
  valid: boolean;
  active: boolean;
  valid_indication?: DrivingSide;
}

export interface MapboxStreetsV8 {
  class: Class;
}

export enum Class {
  Secondary = 'secondary',
  Service = 'service',
  Street = 'street',
}

export interface Maneuver {
  type: string;
  instruction: string;
  bearing_after: number;
  bearing_before: number;
  location: number[];
  modifier?: DrivingSide;
}

export enum Mode {
  Driving = 'driving',
}

export interface Waypoint {
  distance: number;
  name: string;
  location: number[];
}
