import Long = require('long');
import * as $protobuf from 'protobufjs'
/** Namespace air20. */
export namespace air20 {

  /** Namespace input. */
  namespace input {

    /** Properties of an AirInput. */
    interface IAirInput {

      /** AirInput jobId */
      jobId?: (string|null);

      /** AirInput algoConfig */
      algoConfig?: (air20.input.IAlgoConfig|null);

      /** AirInput vehicles */
      vehicles?: (air20.input.IVehicle[]|null);

      /** AirInput destinations */
      destinations?: (air20.input.IDestination[]|null);

      /** AirInput od */
      od?: ({ [k: string]: air20.input.IOd }|null);
    }

    /** Represents an AirInput. */
    class AirInput implements IAirInput {
      /**
             * Constructs a new AirInput.
             * @param [properties] Properties to set
             */
      constructor(properties?: air20.input.IAirInput);

      /** AirInput jobId. */
      public jobId: string

      /** AirInput algoConfig. */
      public algoConfig?: (air20.input.IAlgoConfig|null)

      /** AirInput vehicles. */
      public vehicles: air20.input.IVehicle[]

      /** AirInput destinations. */
      public destinations: air20.input.IDestination[]

      /** AirInput od. */
      public od: { [k: string]: air20.input.IOd }

      /**
             * Creates a new AirInput instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AirInput instance
             */
      public static create(properties?: air20.input.IAirInput): air20.input.AirInput;

      /**
             * Encodes the specified AirInput message. Does not implicitly {@link air20.input.AirInput.verify|verify} messages.
             * @param message AirInput message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encode(message: air20.input.IAirInput, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Encodes the specified AirInput message, length delimited. Does not implicitly {@link air20.input.AirInput.verify|verify} messages.
             * @param message AirInput message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encodeDelimited(message: air20.input.IAirInput, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Decodes an AirInput message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AirInput
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): air20.input.AirInput;

      /**
             * Decodes an AirInput message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AirInput
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): air20.input.AirInput;

      /**
             * Verifies an AirInput message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
      public static verify(message: { [k: string]: any }): (string|null);

      /**
             * Creates an AirInput message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AirInput
             */
      public static fromObject(object: { [k: string]: any }): air20.input.AirInput;

      /**
             * Creates a plain object from an AirInput message. Also converts values to other types if specified.
             * @param message AirInput
             * @param [options] Conversion options
             * @returns Plain object
             */
      public static toObject(message: air20.input.AirInput, options?: $protobuf.IConversionOptions): { [k: string]: any };

      /**
             * Converts this AirInput to JSON.
             * @returns JSON object
             */
      public toJSON(): { [k: string]: any };

      /**
             * Gets the default type url for AirInput
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AlgoConfig. */
    interface IAlgoConfig {

      /** AlgoConfig outputFormat */
      outputFormat?: (string|null);

      /** AlgoConfig maxSlack */
      maxSlack?: (number|null);

      /** AlgoConfig timeLimit */
      timeLimit?: (number|null);

      /** AlgoConfig globalObjectiveMode */
      globalObjectiveMode?: (string|null);

      /** AlgoConfig pickupDeliveryMode */
      pickupDeliveryMode?: (string|null);

      /** AlgoConfig firstSolutionStrategy */
      firstSolutionStrategy?: (number|null);

      /** AlgoConfig improvedSolutionStrategy */
      improvedSolutionStrategy?: (number|null);

      /** AlgoConfig specificSolutionKeys */
      specificSolutionKeys?: (string[]|null);
    }

    /** Represents an AlgoConfig. */
    class AlgoConfig implements IAlgoConfig {
      /**
             * Constructs a new AlgoConfig.
             * @param [properties] Properties to set
             */
      constructor(properties?: air20.input.IAlgoConfig);

      /** AlgoConfig outputFormat. */
      public outputFormat: string

      /** AlgoConfig maxSlack. */
      public maxSlack: number

      /** AlgoConfig timeLimit. */
      public timeLimit: number

      /** AlgoConfig globalObjectiveMode. */
      public globalObjectiveMode: string

      /** AlgoConfig pickupDeliveryMode. */
      public pickupDeliveryMode: string

      /** AlgoConfig firstSolutionStrategy. */
      public firstSolutionStrategy: number

      /** AlgoConfig improvedSolutionStrategy. */
      public improvedSolutionStrategy: number

      /** AlgoConfig specificSolutionKeys. */
      public specificSolutionKeys: string[]

      /**
             * Creates a new AlgoConfig instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AlgoConfig instance
             */
      public static create(properties?: air20.input.IAlgoConfig): air20.input.AlgoConfig;

      /**
             * Encodes the specified AlgoConfig message. Does not implicitly {@link air20.input.AlgoConfig.verify|verify} messages.
             * @param message AlgoConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encode(message: air20.input.IAlgoConfig, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Encodes the specified AlgoConfig message, length delimited. Does not implicitly {@link air20.input.AlgoConfig.verify|verify} messages.
             * @param message AlgoConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encodeDelimited(message: air20.input.IAlgoConfig, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Decodes an AlgoConfig message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AlgoConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): air20.input.AlgoConfig;

      /**
             * Decodes an AlgoConfig message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AlgoConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): air20.input.AlgoConfig;

      /**
             * Verifies an AlgoConfig message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
      public static verify(message: { [k: string]: any }): (string|null);

      /**
             * Creates an AlgoConfig message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AlgoConfig
             */
      public static fromObject(object: { [k: string]: any }): air20.input.AlgoConfig;

      /**
             * Creates a plain object from an AlgoConfig message. Also converts values to other types if specified.
             * @param message AlgoConfig
             * @param [options] Conversion options
             * @returns Plain object
             */
      public static toObject(message: air20.input.AlgoConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

      /**
             * Converts this AlgoConfig to JSON.
             * @returns JSON object
             */
      public toJSON(): { [k: string]: any };

      /**
             * Gets the default type url for AlgoConfig
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Vehicle. */
    interface IVehicle {

      /** Vehicle id */
      id?: (string|null);

      /** Vehicle type */
      type?: (string|null);

      /** Vehicle startTime */
      startTime?: (number|null);

      /** Vehicle endTime */
      endTime?: (number|null);

      /** Vehicle startLocation */
      startLocation?: (string[]|null);

      /** Vehicle endLocation */
      endLocation?: (string[]|null);

      /** Vehicle forceUse */
      forceUse?: (boolean|null);

      /** Vehicle priority */
      priority?: (number|null);

      /** Vehicle forceStart */
      forceStart?: (boolean|null);

      /** Vehicle minCapacity */
      minCapacity?: (number|Long|null);

      /** Vehicle maxCapacity */
      maxCapacity?: (number|Long|null);

      /** Vehicle minWorkTime */
      minWorkTime?: (number|null);

      /** Vehicle regularWorkTime */
      regularWorkTime?: (number|null);

      /** Vehicle considerOvertime */
      considerOvertime?: (boolean|null);

      /** Vehicle maxWorkOvertime */
      maxWorkOvertime?: (number|null);

      /** Vehicle minDrivingTime */
      minDrivingTime?: (number|null);

      /** Vehicle maxDrivingTime */
      maxDrivingTime?: (number|null);

      /** Vehicle minDrivingDistance */
      minDrivingDistance?: (number|null);

      /** Vehicle maxDrivingDistance */
      maxDrivingDistance?: (number|null);

      /** Vehicle minDestinationCount */
      minDestinationCount?: (number|null);

      /** Vehicle maxDestinationCount */
      maxDestinationCount?: (number|null);

      /** Vehicle startSetupTime */
      startSetupTime?: (number|null);

      /** Vehicle endSetupTime */
      endSetupTime?: (number|null);
    }

    /** Represents a Vehicle. */
    class Vehicle implements IVehicle {
      /**
             * Constructs a new Vehicle.
             * @param [properties] Properties to set
             */
      constructor(properties?: air20.input.IVehicle);

      /** Vehicle id. */
      public id: string

      /** Vehicle type. */
      public type: string

      /** Vehicle startTime. */
      public startTime: number

      /** Vehicle endTime. */
      public endTime: number

      /** Vehicle startLocation. */
      public startLocation: string[]

      /** Vehicle endLocation. */
      public endLocation: string[]

      /** Vehicle forceUse. */
      public forceUse: boolean

      /** Vehicle priority. */
      public priority: number

      /** Vehicle forceStart. */
      public forceStart: boolean

      /** Vehicle minCapacity. */
      public minCapacity: (number|Long)

      /** Vehicle maxCapacity. */
      public maxCapacity: (number|Long)

      /** Vehicle minWorkTime. */
      public minWorkTime: number

      /** Vehicle regularWorkTime. */
      public regularWorkTime: number

      /** Vehicle considerOvertime. */
      public considerOvertime: boolean

      /** Vehicle maxWorkOvertime. */
      public maxWorkOvertime: number

      /** Vehicle minDrivingTime. */
      public minDrivingTime: number

      /** Vehicle maxDrivingTime. */
      public maxDrivingTime: number

      /** Vehicle minDrivingDistance. */
      public minDrivingDistance: number

      /** Vehicle maxDrivingDistance. */
      public maxDrivingDistance: number

      /** Vehicle minDestinationCount. */
      public minDestinationCount: number

      /** Vehicle maxDestinationCount. */
      public maxDestinationCount: number

      /** Vehicle startSetupTime. */
      public startSetupTime: number

      /** Vehicle endSetupTime. */
      public endSetupTime: number

      /**
             * Creates a new Vehicle instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Vehicle instance
             */
      public static create(properties?: air20.input.IVehicle): air20.input.Vehicle;

      /**
             * Encodes the specified Vehicle message. Does not implicitly {@link air20.input.Vehicle.verify|verify} messages.
             * @param message Vehicle message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encode(message: air20.input.IVehicle, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Encodes the specified Vehicle message, length delimited. Does not implicitly {@link air20.input.Vehicle.verify|verify} messages.
             * @param message Vehicle message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encodeDelimited(message: air20.input.IVehicle, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Decodes a Vehicle message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Vehicle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): air20.input.Vehicle;

      /**
             * Decodes a Vehicle message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Vehicle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): air20.input.Vehicle;

      /**
             * Verifies a Vehicle message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
      public static verify(message: { [k: string]: any }): (string|null);

      /**
             * Creates a Vehicle message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Vehicle
             */
      public static fromObject(object: { [k: string]: any }): air20.input.Vehicle;

      /**
             * Creates a plain object from a Vehicle message. Also converts values to other types if specified.
             * @param message Vehicle
             * @param [options] Conversion options
             * @returns Plain object
             */
      public static toObject(message: air20.input.Vehicle, options?: $protobuf.IConversionOptions): { [k: string]: any };

      /**
             * Converts this Vehicle to JSON.
             * @returns JSON object
             */
      public toJSON(): { [k: string]: any };

      /**
             * Gets the default type url for Vehicle
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Destination. */
    interface IDestination {

      /** Destination id */
      id?: (string|null);

      /** Destination type */
      type?: (number|null);

      /** Destination location */
      location?: (string|null);

      /** Destination demand */
      demand?: (air20.input.IDemand[]|null);

      /** Destination executeVehicles */
      executeVehicles?: (string[]|null);

      /** Destination serviceTimeMode */
      serviceTimeMode?: (string|null);

      /** Destination serviceTime */
      serviceTime?: (number|null);

      /** Destination serviceTimeDependOnVehicle */
      serviceTimeDependOnVehicle?: ({ [k: string]: number }|null);

      /** Destination arrivalMode */
      arrivalMode?: (string|null);

      /** Destination priority */
      priority?: (number|null);

      /** Destination timeWindowsMode */
      timeWindowsMode?: (string|null);

      /** Destination timeWindows */
      timeWindows?: (air20.input.ITimeWindow[]|null);
    }

    /** Represents a Destination. */
    class Destination implements IDestination {
      /**
             * Constructs a new Destination.
             * @param [properties] Properties to set
             */
      constructor(properties?: air20.input.IDestination);

      /** Destination id. */
      public id: string

      /** Destination type. */
      public type: number

      /** Destination location. */
      public location: string

      /** Destination demand. */
      public demand: air20.input.IDemand[]

      /** Destination executeVehicles. */
      public executeVehicles: string[]

      /** Destination serviceTimeMode. */
      public serviceTimeMode: string

      /** Destination serviceTime. */
      public serviceTime: number

      /** Destination serviceTimeDependOnVehicle. */
      public serviceTimeDependOnVehicle: { [k: string]: number }

      /** Destination arrivalMode. */
      public arrivalMode: string

      /** Destination priority. */
      public priority: number

      /** Destination timeWindowsMode. */
      public timeWindowsMode: string

      /** Destination timeWindows. */
      public timeWindows: air20.input.ITimeWindow[]

      /**
             * Creates a new Destination instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Destination instance
             */
      public static create(properties?: air20.input.IDestination): air20.input.Destination;

      /**
             * Encodes the specified Destination message. Does not implicitly {@link air20.input.Destination.verify|verify} messages.
             * @param message Destination message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encode(message: air20.input.IDestination, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Encodes the specified Destination message, length delimited. Does not implicitly {@link air20.input.Destination.verify|verify} messages.
             * @param message Destination message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encodeDelimited(message: air20.input.IDestination, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Decodes a Destination message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Destination
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): air20.input.Destination;

      /**
             * Decodes a Destination message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Destination
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): air20.input.Destination;

      /**
             * Verifies a Destination message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
      public static verify(message: { [k: string]: any }): (string|null);

      /**
             * Creates a Destination message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Destination
             */
      public static fromObject(object: { [k: string]: any }): air20.input.Destination;

      /**
             * Creates a plain object from a Destination message. Also converts values to other types if specified.
             * @param message Destination
             * @param [options] Conversion options
             * @returns Plain object
             */
      public static toObject(message: air20.input.Destination, options?: $protobuf.IConversionOptions): { [k: string]: any };

      /**
             * Converts this Destination to JSON.
             * @returns JSON object
             */
      public toJSON(): { [k: string]: any };

      /**
             * Gets the default type url for Destination
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Demand. */
    interface IDemand {

      /** Demand type */
      type?: (string|null);

      /** Demand quantity */
      quantity?: (number|Long|null);

      /** Demand info */
      info?: ({ [k: string]: string }|null);
    }

    /** Represents a Demand. */
    class Demand implements IDemand {
      /**
             * Constructs a new Demand.
             * @param [properties] Properties to set
             */
      constructor(properties?: air20.input.IDemand);

      /** Demand type. */
      public type: string

      /** Demand quantity. */
      public quantity: (number|Long)

      /** Demand info. */
      public info: { [k: string]: string }

      /**
             * Creates a new Demand instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Demand instance
             */
      public static create(properties?: air20.input.IDemand): air20.input.Demand;

      /**
             * Encodes the specified Demand message. Does not implicitly {@link air20.input.Demand.verify|verify} messages.
             * @param message Demand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encode(message: air20.input.IDemand, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Encodes the specified Demand message, length delimited. Does not implicitly {@link air20.input.Demand.verify|verify} messages.
             * @param message Demand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encodeDelimited(message: air20.input.IDemand, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Decodes a Demand message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Demand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): air20.input.Demand;

      /**
             * Decodes a Demand message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Demand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): air20.input.Demand;

      /**
             * Verifies a Demand message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
      public static verify(message: { [k: string]: any }): (string|null);

      /**
             * Creates a Demand message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Demand
             */
      public static fromObject(object: { [k: string]: any }): air20.input.Demand;

      /**
             * Creates a plain object from a Demand message. Also converts values to other types if specified.
             * @param message Demand
             * @param [options] Conversion options
             * @returns Plain object
             */
      public static toObject(message: air20.input.Demand, options?: $protobuf.IConversionOptions): { [k: string]: any };

      /**
             * Converts this Demand to JSON.
             * @returns JSON object
             */
      public toJSON(): { [k: string]: any };

      /**
             * Gets the default type url for Demand
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a TimeWindow. */
    interface ITimeWindow {

      /** TimeWindow start */
      start?: (number|null);

      /** TimeWindow end */
      end?: (number|null);
    }

    /** Represents a TimeWindow. */
    class TimeWindow implements ITimeWindow {
      /**
             * Constructs a new TimeWindow.
             * @param [properties] Properties to set
             */
      constructor(properties?: air20.input.ITimeWindow);

      /** TimeWindow start. */
      public start: number

      /** TimeWindow end. */
      public end: number

      /**
             * Creates a new TimeWindow instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TimeWindow instance
             */
      public static create(properties?: air20.input.ITimeWindow): air20.input.TimeWindow;

      /**
             * Encodes the specified TimeWindow message. Does not implicitly {@link air20.input.TimeWindow.verify|verify} messages.
             * @param message TimeWindow message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encode(message: air20.input.ITimeWindow, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Encodes the specified TimeWindow message, length delimited. Does not implicitly {@link air20.input.TimeWindow.verify|verify} messages.
             * @param message TimeWindow message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encodeDelimited(message: air20.input.ITimeWindow, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Decodes a TimeWindow message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TimeWindow
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): air20.input.TimeWindow;

      /**
             * Decodes a TimeWindow message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TimeWindow
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): air20.input.TimeWindow;

      /**
             * Verifies a TimeWindow message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
      public static verify(message: { [k: string]: any }): (string|null);

      /**
             * Creates a TimeWindow message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TimeWindow
             */
      public static fromObject(object: { [k: string]: any }): air20.input.TimeWindow;

      /**
             * Creates a plain object from a TimeWindow message. Also converts values to other types if specified.
             * @param message TimeWindow
             * @param [options] Conversion options
             * @returns Plain object
             */
      public static toObject(message: air20.input.TimeWindow, options?: $protobuf.IConversionOptions): { [k: string]: any };

      /**
             * Converts this TimeWindow to JSON.
             * @returns JSON object
             */
      public toJSON(): { [k: string]: any };

      /**
             * Gets the default type url for TimeWindow
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an Od. */
    interface IOd {

      /** Od truck */
      truck?: (number[]|null);

      /** Od motorcycle */
      motorcycle?: (number[]|null);
    }

    /** Represents an Od. */
    class Od implements IOd {
      /**
             * Constructs a new Od.
             * @param [properties] Properties to set
             */
      constructor(properties?: air20.input.IOd);

      /** Od truck. */
      public truck: number[]

      /** Od motorcycle. */
      public motorcycle: number[]

      /**
             * Creates a new Od instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Od instance
             */
      public static create(properties?: air20.input.IOd): air20.input.Od;

      /**
             * Encodes the specified Od message. Does not implicitly {@link air20.input.Od.verify|verify} messages.
             * @param message Od message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encode(message: air20.input.IOd, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Encodes the specified Od message, length delimited. Does not implicitly {@link air20.input.Od.verify|verify} messages.
             * @param message Od message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encodeDelimited(message: air20.input.IOd, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Decodes an Od message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Od
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): air20.input.Od;

      /**
             * Decodes an Od message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Od
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): air20.input.Od;

      /**
             * Verifies an Od message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
      public static verify(message: { [k: string]: any }): (string|null);

      /**
             * Creates an Od message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Od
             */
      public static fromObject(object: { [k: string]: any }): air20.input.Od;

      /**
             * Creates a plain object from an Od message. Also converts values to other types if specified.
             * @param message Od
             * @param [options] Conversion options
             * @returns Plain object
             */
      public static toObject(message: air20.input.Od, options?: $protobuf.IConversionOptions): { [k: string]: any };

      /**
             * Converts this Od to JSON.
             * @returns JSON object
             */
      public toJSON(): { [k: string]: any };

      /**
             * Gets the default type url for Od
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }
  }

  /** Namespace output. */
  namespace output {

    /** Properties of an AirOutput. */
    interface IAirOutput {

      /** AirOutput jobId */
      jobId?: (string|null);

      /** AirOutput status */
      status?: (string|null);

      /** AirOutput version */
      version?: (string|null);

      /** AirOutput indicators */
      indicators?: ({ [k: string]: string }|null);

      /** AirOutput idleVehicles */
      idleVehicles?: (air20.output.IIdleVehicle[]|null);

      /** AirOutput unDispatches */
      unDispatches?: (air20.output.IUnDispatch[]|null);

      /** AirOutput routes */
      routes?: (air20.output.IAirRoute[]|null);

      /** AirOutput module */
      module?: (air20.output.IModule|null);

      /** AirOutput errors */
      errors?: (air20.output.IError[]|null);
    }

    /** Represents an AirOutput. */
    class AirOutput implements IAirOutput {
      /**
             * Constructs a new AirOutput.
             * @param [properties] Properties to set
             */
      constructor(properties?: air20.output.IAirOutput);

      /** AirOutput jobId. */
      public jobId: string

      /** AirOutput status. */
      public status: string

      /** AirOutput version. */
      public version: string

      /** AirOutput indicators. */
      public indicators: { [k: string]: string }

      /** AirOutput idleVehicles. */
      public idleVehicles: air20.output.IIdleVehicle[]

      /** AirOutput unDispatches. */
      public unDispatches: air20.output.IUnDispatch[]

      /** AirOutput routes. */
      public routes: air20.output.IAirRoute[]

      /** AirOutput module. */
      public module?: (air20.output.IModule|null)

      /** AirOutput errors. */
      public errors: air20.output.IError[]

      /**
             * Creates a new AirOutput instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AirOutput instance
             */
      public static create(properties?: air20.output.IAirOutput): air20.output.AirOutput;

      /**
             * Encodes the specified AirOutput message. Does not implicitly {@link air20.output.AirOutput.verify|verify} messages.
             * @param message AirOutput message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encode(message: air20.output.IAirOutput, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Encodes the specified AirOutput message, length delimited. Does not implicitly {@link air20.output.AirOutput.verify|verify} messages.
             * @param message AirOutput message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encodeDelimited(message: air20.output.IAirOutput, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Decodes an AirOutput message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AirOutput
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): air20.output.AirOutput;

      /**
             * Decodes an AirOutput message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AirOutput
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): air20.output.AirOutput;

      /**
             * Verifies an AirOutput message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
      public static verify(message: { [k: string]: any }): (string|null);

      /**
             * Creates an AirOutput message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AirOutput
             */
      public static fromObject(object: { [k: string]: any }): air20.output.AirOutput;

      /**
             * Creates a plain object from an AirOutput message. Also converts values to other types if specified.
             * @param message AirOutput
             * @param [options] Conversion options
             * @returns Plain object
             */
      public static toObject(message: air20.output.AirOutput, options?: $protobuf.IConversionOptions): { [k: string]: any };

      /**
             * Converts this AirOutput to JSON.
             * @returns JSON object
             */
      public toJSON(): { [k: string]: any };

      /**
             * Gets the default type url for AirOutput
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an IdleVehicle. */
    interface IIdleVehicle {

      /** IdleVehicle id */
      id?: (string|null);

      /** IdleVehicle reason */
      reason?: (string|null);

      /** IdleVehicle info */
      info?: (string|null);
    }

    /** Represents an IdleVehicle. */
    class IdleVehicle implements IIdleVehicle {
      /**
             * Constructs a new IdleVehicle.
             * @param [properties] Properties to set
             */
      constructor(properties?: air20.output.IIdleVehicle);

      /** IdleVehicle id. */
      public id: string

      /** IdleVehicle reason. */
      public reason: string

      /** IdleVehicle info. */
      public info: string

      /**
             * Creates a new IdleVehicle instance using the specified properties.
             * @param [properties] Properties to set
             * @returns IdleVehicle instance
             */
      public static create(properties?: air20.output.IIdleVehicle): air20.output.IdleVehicle;

      /**
             * Encodes the specified IdleVehicle message. Does not implicitly {@link air20.output.IdleVehicle.verify|verify} messages.
             * @param message IdleVehicle message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encode(message: air20.output.IIdleVehicle, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Encodes the specified IdleVehicle message, length delimited. Does not implicitly {@link air20.output.IdleVehicle.verify|verify} messages.
             * @param message IdleVehicle message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encodeDelimited(message: air20.output.IIdleVehicle, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Decodes an IdleVehicle message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns IdleVehicle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): air20.output.IdleVehicle;

      /**
             * Decodes an IdleVehicle message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns IdleVehicle
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): air20.output.IdleVehicle;

      /**
             * Verifies an IdleVehicle message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
      public static verify(message: { [k: string]: any }): (string|null);

      /**
             * Creates an IdleVehicle message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns IdleVehicle
             */
      public static fromObject(object: { [k: string]: any }): air20.output.IdleVehicle;

      /**
             * Creates a plain object from an IdleVehicle message. Also converts values to other types if specified.
             * @param message IdleVehicle
             * @param [options] Conversion options
             * @returns Plain object
             */
      public static toObject(message: air20.output.IdleVehicle, options?: $protobuf.IConversionOptions): { [k: string]: any };

      /**
             * Converts this IdleVehicle to JSON.
             * @returns JSON object
             */
      public toJSON(): { [k: string]: any };

      /**
             * Gets the default type url for IdleVehicle
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an UnDispatch. */
    interface IUnDispatch {

      /** UnDispatch id */
      id?: (string|null);

      /** UnDispatch reason */
      reason?: (string|null);

      /** UnDispatch info */
      info?: (string|null);
    }

    /** Represents an UnDispatch. */
    class UnDispatch implements IUnDispatch {
      /**
             * Constructs a new UnDispatch.
             * @param [properties] Properties to set
             */
      constructor(properties?: air20.output.IUnDispatch);

      /** UnDispatch id. */
      public id: string

      /** UnDispatch reason. */
      public reason: string

      /** UnDispatch info. */
      public info: string

      /**
             * Creates a new UnDispatch instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UnDispatch instance
             */
      public static create(properties?: air20.output.IUnDispatch): air20.output.UnDispatch;

      /**
             * Encodes the specified UnDispatch message. Does not implicitly {@link air20.output.UnDispatch.verify|verify} messages.
             * @param message UnDispatch message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encode(message: air20.output.IUnDispatch, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Encodes the specified UnDispatch message, length delimited. Does not implicitly {@link air20.output.UnDispatch.verify|verify} messages.
             * @param message UnDispatch message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encodeDelimited(message: air20.output.IUnDispatch, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Decodes an UnDispatch message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UnDispatch
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): air20.output.UnDispatch;

      /**
             * Decodes an UnDispatch message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UnDispatch
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): air20.output.UnDispatch;

      /**
             * Verifies an UnDispatch message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
      public static verify(message: { [k: string]: any }): (string|null);

      /**
             * Creates an UnDispatch message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UnDispatch
             */
      public static fromObject(object: { [k: string]: any }): air20.output.UnDispatch;

      /**
             * Creates a plain object from an UnDispatch message. Also converts values to other types if specified.
             * @param message UnDispatch
             * @param [options] Conversion options
             * @returns Plain object
             */
      public static toObject(message: air20.output.UnDispatch, options?: $protobuf.IConversionOptions): { [k: string]: any };

      /**
             * Converts this UnDispatch to JSON.
             * @returns JSON object
             */
      public toJSON(): { [k: string]: any };

      /**
             * Gets the default type url for UnDispatch
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AirRoute. */
    interface IAirRoute {

      /** AirRoute id */
      id?: (string|null);

      /** AirRoute startTime */
      startTime?: (number|null);

      /** AirRoute endTime */
      endTime?: (number|null);

      /** AirRoute totalDeliveryDemand */
      totalDeliveryDemand?: (number|Long|null);

      /** AirRoute totalPickupDemand */
      totalPickupDemand?: (number|Long|null);

      /** AirRoute totalDrivingTime */
      totalDrivingTime?: (number|null);

      /** AirRoute totalSlackTime */
      totalSlackTime?: (number|null);

      /** AirRoute totalServiceTime */
      totalServiceTime?: (number|null);

      /** AirRoute totalWorkTime */
      totalWorkTime?: (number|null);

      /** AirRoute isOvertime */
      isOvertime?: (boolean|null);

      /** AirRoute totalDrivingDistance */
      totalDrivingDistance?: (number|null);

      /** AirRoute tasks */
      tasks?: (air20.output.IAirTask[]|null);
    }

    /** Represents an AirRoute. */
    class AirRoute implements IAirRoute {
      /**
             * Constructs a new AirRoute.
             * @param [properties] Properties to set
             */
      constructor(properties?: air20.output.IAirRoute);

      /** AirRoute id. */
      public id: string

      /** AirRoute startTime. */
      public startTime: number

      /** AirRoute endTime. */
      public endTime: number

      /** AirRoute totalDeliveryDemand. */
      public totalDeliveryDemand: (number|Long)

      /** AirRoute totalPickupDemand. */
      public totalPickupDemand: (number|Long)

      /** AirRoute totalDrivingTime. */
      public totalDrivingTime: number

      /** AirRoute totalSlackTime. */
      public totalSlackTime: number

      /** AirRoute totalServiceTime. */
      public totalServiceTime: number

      /** AirRoute totalWorkTime. */
      public totalWorkTime: number

      /** AirRoute isOvertime. */
      public isOvertime: boolean

      /** AirRoute totalDrivingDistance. */
      public totalDrivingDistance: number

      /** AirRoute tasks. */
      public tasks: air20.output.IAirTask[]

      /**
             * Creates a new AirRoute instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AirRoute instance
             */
      public static create(properties?: air20.output.IAirRoute): air20.output.AirRoute;

      /**
             * Encodes the specified AirRoute message. Does not implicitly {@link air20.output.AirRoute.verify|verify} messages.
             * @param message AirRoute message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encode(message: air20.output.IAirRoute, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Encodes the specified AirRoute message, length delimited. Does not implicitly {@link air20.output.AirRoute.verify|verify} messages.
             * @param message AirRoute message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encodeDelimited(message: air20.output.IAirRoute, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Decodes an AirRoute message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AirRoute
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): air20.output.AirRoute;

      /**
             * Decodes an AirRoute message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AirRoute
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): air20.output.AirRoute;

      /**
             * Verifies an AirRoute message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
      public static verify(message: { [k: string]: any }): (string|null);

      /**
             * Creates an AirRoute message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AirRoute
             */
      public static fromObject(object: { [k: string]: any }): air20.output.AirRoute;

      /**
             * Creates a plain object from an AirRoute message. Also converts values to other types if specified.
             * @param message AirRoute
             * @param [options] Conversion options
             * @returns Plain object
             */
      public static toObject(message: air20.output.AirRoute, options?: $protobuf.IConversionOptions): { [k: string]: any };

      /**
             * Converts this AirRoute to JSON.
             * @returns JSON object
             */
      public toJSON(): { [k: string]: any };

      /**
             * Gets the default type url for AirRoute
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AirTask. */
    interface IAirTask {

      /** AirTask seq */
      seq?: (number|null);

      /** AirTask refId */
      refId?: (string|null);

      /** AirTask location */
      location?: (string|null);

      /** AirTask event */
      event?: (string|null);

      /** AirTask type */
      type?: (number|null);

      /** AirTask transitDistance */
      transitDistance?: (number|null);

      /** AirTask transitTime */
      transitTime?: (number|null);

      /** AirTask arrivalTime */
      arrivalTime?: (number|null);

      /** AirTask arrivalCapacity */
      arrivalCapacity?: (number|Long|null);

      /** AirTask serviceTime */
      serviceTime?: (number|null);

      /** AirTask slackTime */
      slackTime?: (number|null);

      /** AirTask demand */
      demand?: (air20.output.IDemand[]|null);
    }

    /** Represents an AirTask. */
    class AirTask implements IAirTask {
      /**
             * Constructs a new AirTask.
             * @param [properties] Properties to set
             */
      constructor(properties?: air20.output.IAirTask);

      /** AirTask seq. */
      public seq: number

      /** AirTask refId. */
      public refId: string

      /** AirTask location. */
      public location: string

      /** AirTask event. */
      public event: string

      /** AirTask type. */
      public type: number

      /** AirTask transitDistance. */
      public transitDistance: number

      /** AirTask transitTime. */
      public transitTime: number

      /** AirTask arrivalTime. */
      public arrivalTime: number

      /** AirTask arrivalCapacity. */
      public arrivalCapacity: (number|Long)

      /** AirTask serviceTime. */
      public serviceTime: number

      /** AirTask slackTime. */
      public slackTime: number

      /** AirTask demand. */
      public demand: air20.output.IDemand[]

      /**
             * Creates a new AirTask instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AirTask instance
             */
      public static create(properties?: air20.output.IAirTask): air20.output.AirTask;

      /**
             * Encodes the specified AirTask message. Does not implicitly {@link air20.output.AirTask.verify|verify} messages.
             * @param message AirTask message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encode(message: air20.output.IAirTask, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Encodes the specified AirTask message, length delimited. Does not implicitly {@link air20.output.AirTask.verify|verify} messages.
             * @param message AirTask message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encodeDelimited(message: air20.output.IAirTask, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Decodes an AirTask message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AirTask
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): air20.output.AirTask;

      /**
             * Decodes an AirTask message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AirTask
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): air20.output.AirTask;

      /**
             * Verifies an AirTask message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
      public static verify(message: { [k: string]: any }): (string|null);

      /**
             * Creates an AirTask message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AirTask
             */
      public static fromObject(object: { [k: string]: any }): air20.output.AirTask;

      /**
             * Creates a plain object from an AirTask message. Also converts values to other types if specified.
             * @param message AirTask
             * @param [options] Conversion options
             * @returns Plain object
             */
      public static toObject(message: air20.output.AirTask, options?: $protobuf.IConversionOptions): { [k: string]: any };

      /**
             * Converts this AirTask to JSON.
             * @returns JSON object
             */
      public toJSON(): { [k: string]: any };

      /**
             * Gets the default type url for AirTask
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Demand. */
    interface IDemand {

      /** Demand type */
      type?: (string|null);

      /** Demand quantity */
      quantity?: (number|Long|null);

      /** Demand info */
      info?: ({ [k: string]: string }|null);
    }

    /** Represents a Demand. */
    class Demand implements IDemand {
      /**
             * Constructs a new Demand.
             * @param [properties] Properties to set
             */
      constructor(properties?: air20.output.IDemand);

      /** Demand type. */
      public type: string

      /** Demand quantity. */
      public quantity: (number|Long)

      /** Demand info. */
      public info: { [k: string]: string }

      /**
             * Creates a new Demand instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Demand instance
             */
      public static create(properties?: air20.output.IDemand): air20.output.Demand;

      /**
             * Encodes the specified Demand message. Does not implicitly {@link air20.output.Demand.verify|verify} messages.
             * @param message Demand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encode(message: air20.output.IDemand, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Encodes the specified Demand message, length delimited. Does not implicitly {@link air20.output.Demand.verify|verify} messages.
             * @param message Demand message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encodeDelimited(message: air20.output.IDemand, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Decodes a Demand message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Demand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): air20.output.Demand;

      /**
             * Decodes a Demand message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Demand
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): air20.output.Demand;

      /**
             * Verifies a Demand message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
      public static verify(message: { [k: string]: any }): (string|null);

      /**
             * Creates a Demand message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Demand
             */
      public static fromObject(object: { [k: string]: any }): air20.output.Demand;

      /**
             * Creates a plain object from a Demand message. Also converts values to other types if specified.
             * @param message Demand
             * @param [options] Conversion options
             * @returns Plain object
             */
      public static toObject(message: air20.output.Demand, options?: $protobuf.IConversionOptions): { [k: string]: any };

      /**
             * Converts this Demand to JSON.
             * @returns JSON object
             */
      public toJSON(): { [k: string]: any };

      /**
             * Gets the default type url for Demand
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Module. */
    interface IModule {

      /** Module code */
      code?: (string|null);

      /** Module name */
      name?: (string|null);

      /** Module version */
      version?: (string|null);
    }

    /** Represents a Module. */
    class Module implements IModule {
      /**
             * Constructs a new Module.
             * @param [properties] Properties to set
             */
      constructor(properties?: air20.output.IModule);

      /** Module code. */
      public code: string

      /** Module name. */
      public name: string

      /** Module version. */
      public version: string

      /**
             * Creates a new Module instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Module instance
             */
      public static create(properties?: air20.output.IModule): air20.output.Module;

      /**
             * Encodes the specified Module message. Does not implicitly {@link air20.output.Module.verify|verify} messages.
             * @param message Module message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encode(message: air20.output.IModule, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Encodes the specified Module message, length delimited. Does not implicitly {@link air20.output.Module.verify|verify} messages.
             * @param message Module message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encodeDelimited(message: air20.output.IModule, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Decodes a Module message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Module
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): air20.output.Module;

      /**
             * Decodes a Module message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Module
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): air20.output.Module;

      /**
             * Verifies a Module message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
      public static verify(message: { [k: string]: any }): (string|null);

      /**
             * Creates a Module message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Module
             */
      public static fromObject(object: { [k: string]: any }): air20.output.Module;

      /**
             * Creates a plain object from a Module message. Also converts values to other types if specified.
             * @param message Module
             * @param [options] Conversion options
             * @returns Plain object
             */
      public static toObject(message: air20.output.Module, options?: $protobuf.IConversionOptions): { [k: string]: any };

      /**
             * Converts this Module to JSON.
             * @returns JSON object
             */
      public toJSON(): { [k: string]: any };

      /**
             * Gets the default type url for Module
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an Error. */
    interface IError {

      /** Error code */
      code?: (string|null);

      /** Error type */
      type?: (string|null);

      /** Error name */
      name?: (string|null);

      /** Error message */
      message?: (string|null);
    }

    /** Represents an Error. */
    class Error implements IError {
      /**
             * Constructs a new Error.
             * @param [properties] Properties to set
             */
      constructor(properties?: air20.output.IError);

      /** Error code. */
      public code: string

      /** Error type. */
      public type: string

      /** Error name. */
      public name: string

      /** Error message. */
      public message: string

      /**
             * Creates a new Error instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Error instance
             */
      public static create(properties?: air20.output.IError): air20.output.Error;

      /**
             * Encodes the specified Error message. Does not implicitly {@link air20.output.Error.verify|verify} messages.
             * @param message Error message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encode(message: air20.output.IError, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Encodes the specified Error message, length delimited. Does not implicitly {@link air20.output.Error.verify|verify} messages.
             * @param message Error message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
      public static encodeDelimited(message: air20.output.IError, writer?: $protobuf.Writer): $protobuf.Writer;

      /**
             * Decodes an Error message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): air20.output.Error;

      /**
             * Decodes an Error message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
      public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): air20.output.Error;

      /**
             * Verifies an Error message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
      public static verify(message: { [k: string]: any }): (string|null);

      /**
             * Creates an Error message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Error
             */
      public static fromObject(object: { [k: string]: any }): air20.output.Error;

      /**
             * Creates a plain object from an Error message. Also converts values to other types if specified.
             * @param message Error
             * @param [options] Conversion options
             * @returns Plain object
             */
      public static toObject(message: air20.output.Error, options?: $protobuf.IConversionOptions): { [k: string]: any };

      /**
             * Converts this Error to JSON.
             * @returns JSON object
             */
      public toJSON(): { [k: string]: any };

      /**
             * Gets the default type url for Error
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }
  }
}
